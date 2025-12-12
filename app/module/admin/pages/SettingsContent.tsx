import { Bell, CheckCircle, CreditCard, Database, HardDrive, Mail, Save, Settings, Shield, XCircle, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { youtubeService } from "~/module/admin/services/YouTubeApi";
import { useToast } from "~/shared/hooks/useToast";

const SettingsContent: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'ZoneEdu LMS',
    siteDescription: 'Online Learning Platform',
    siteEmail: 'admin@zoneedu.com',
    sitePhone: '+1 234 567 8900',
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    smsNotifications: false,
    currency: 'USD',
    timezone: 'UTC-5',
    language: 'en'
  });

  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  // Check YouTube connection status on mount and when switching to storage tab
  useEffect(() => {
    if (activeTab === 'storage') {
      checkYouTubeStatus();
    }
  }, [activeTab]);

  // Handle OAuth callback when returning from backend
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const tab = urlParams.get('tab');
    const success = urlParams.get('success');
    const error = urlParams.get('error');

    // Case 1: Backend redirect về với code (backend chưa xử lý)
    if (code && tab === 'storage') {
      handleOAuthCallback(code);
    }
    // Case 2: Backend redirect về với success/error status (backend đã xử lý)
    else if (tab === 'storage') {
      if (success === 'true') {
        setYoutubeConnected(true);
        toast.success('Kết nối YouTube thành công!');
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname + '?tab=storage');
      } else if (error) {
        toast.error(`Lỗi kết nối YouTube: ${decodeURIComponent(error)}`);
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname + '?tab=storage');
      }
    }
  }, []);

  // Check YouTube connection status from API
  const checkYouTubeStatus = async () => {
    setIsCheckingStatus(true);
    try {
      const response = await youtubeService.checkConnectionStatus();
      if (response.isSuccess) {
        setYoutubeConnected(response.value);
      } else {
        // If API doesn't exist yet, fallback to checking localStorage
        const accessToken = localStorage.getItem('youtube_access_token');
        const refreshToken = localStorage.getItem('youtube_refresh_token');
        setYoutubeConnected(!!(accessToken || refreshToken));
      }
    } catch (error) {
      // If API doesn't exist, fallback to localStorage check
      const accessToken = localStorage.getItem('youtube_access_token');
      const refreshToken = localStorage.getItem('youtube_refresh_token');
      setYoutubeConnected(!!(accessToken || refreshToken));
    } finally {
      setIsCheckingStatus(false);
    }
  };

  const handleOAuthCallback = async (code: string) => {
    setIsConnecting(true);
    try {
      // Backend đã xử lý callback, chỉ cần gọi API để confirm
      const response = await youtubeService.handleCallback(code);

      if (response.isSuccess && response.value) {
        setYoutubeConnected(true);
        toast.success('Kết nối YouTube thành công!');

        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname + '?tab=storage');
      } else {
        throw new Error(response.error?.message || 'Không thể kết nối YouTube');
      }
    } catch (error: any) {
      console.error('Error handling OAuth callback:', error);
      const errorMessage = error?.response?.data?.error?.message || error?.message || 'Có lỗi xảy ra khi xử lý kết nối YouTube. Vui lòng thử lại.';
      toast.error(errorMessage);
    } finally {
      setIsConnecting(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'storage', label: 'Storage', icon: HardDrive },
    { id: 'system', label: 'System', icon: Database }
  ];

  const handleSave = () => {
    // Save settings logic here
    console.log('Saving settings:', settings);
  };

  const handleConnectYouTube = async () => {
    setIsConnecting(true);
    try {
      // Call API to get authorization URL (redirectUri sẽ là backend callback URL)
      const response = await youtubeService.getAuthorizationUrl();

      if (response.isSuccess && response.value) {
        // Redirect to Google OAuth page
        window.location.href = response.value;
      } else {
        throw new Error(response.error?.message || 'Không thể lấy authorization URL');
      }
    } catch (error: any) {
      console.error('Error connecting to YouTube:', error);
      const errorMessage = error?.response?.data?.error?.message || error?.message || 'Có lỗi xảy ra khi kết nối YouTube. Vui lòng thử lại.';
      toast.error(errorMessage);
      setIsConnecting(false);
    }
  };

  const handleDisconnectYouTube = async () => {
    if (confirm('Bạn có chắc chắn muốn ngắt kết nối YouTube?')) {
      try {
        // Remove YouTube tokens from storage
        localStorage.removeItem('youtube_access_token');
        localStorage.removeItem('youtube_refresh_token');
        setYoutubeConnected(false);
        toast.success('Đã ngắt kết nối YouTube thành công!');

        // Note: In a real implementation, you might want to call an API
        // to revoke the tokens on the backend as well
      } catch (error: any) {
        console.error('Error disconnecting YouTube:', error);
        toast.error('Có lỗi xảy ra khi ngắt kết nối YouTube.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
          <p className="text-gray-600">Configure platform settings</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">General Settings</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Email</label>
                    <input
                      type="email"
                      value={settings.siteEmail}
                      onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                    <textarea
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Site Phone</label>
                    <input
                      type="tel"
                      value={settings.sitePhone}
                      onChange={(e) => setSettings({ ...settings, sitePhone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      value={settings.currency}
                      onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="VND">VND (₫)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                    <select
                      value={settings.timezone}
                      onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="UTC-5">UTC-5 (EST)</option>
                      <option value="UTC-8">UTC-8 (PST)</option>
                      <option value="UTC+0">UTC+0 (GMT)</option>
                      <option value="UTC+7">UTC+7 (ICT)</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">Maintenance Mode</div>
                    <div className="text-sm text-gray-600">Enable maintenance mode to restrict access</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.maintenanceMode}
                      onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">Allow Registration</div>
                    <div className="text-sm text-gray-600">Allow new users to register</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.allowRegistration}
                      onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Notification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">Email Notifications</div>
                      <div className="text-sm text-gray-600">Send email notifications to users</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">SMS Notifications</div>
                      <div className="text-sm text-gray-600">Send SMS notifications to users</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={(e) => setSettings({ ...settings, smsNotifications: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Security Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Minimum 8 characters</option>
                      <option>Minimum 12 characters</option>
                      <option>Strong (12+ with special chars)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-600">Require 2FA for admin accounts</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Email Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                    <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                      <input type="number" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                      <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Gateway</label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Stripe</option>
                      <option>PayPal</option>
                      <option>Razorpay</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                    <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Storage Settings</h3>
                <div className="space-y-6">
                  {/* YouTube Connection */}
                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-50 rounded-lg">
                          <Youtube className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">YouTube Integration</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            Kết nối với YouTube để upload và quản lý video khóa học
                          </p>
                        </div>
                      </div>
                      {isCheckingStatus ? (
                        <div className="flex items-center gap-2 text-gray-500">
                          <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                          <span className="text-sm font-medium">Đang kiểm tra...</span>
                        </div>
                      ) : youtubeConnected ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">Đã kết nối</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-400">
                          <XCircle className="w-5 h-5" />
                          <span className="text-sm font-medium">Chưa kết nối</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="text-sm text-gray-700 space-y-2">
                        <div className="font-medium mb-2">Tính năng khi kết nối:</div>
                        <ul className="list-disc list-inside space-y-1 text-gray-600">
                          <li>Upload video trực tiếp lên YouTube</li>
                          <li>Quản lý video khóa học từ YouTube</li>
                          <li>Đồng bộ metadata và thông tin video</li>
                          <li>Tự động tạo playlist cho từng khóa học</li>
                        </ul>
                      </div>
                    </div>

                    {youtubeConnected ? (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleDisconnectYouTube}
                          className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition font-medium"
                        >
                          Ngắt kết nối
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                        >
                          Quản lý kết nối
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleConnectYouTube}
                        disabled={isConnecting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isConnecting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Đang kết nối...</span>
                          </>
                        ) : (
                          <>
                            <Youtube className="w-5 h-5" />
                            <span>Connect to YouTube</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Other Storage Options (for future) */}
                  <div className="border border-gray-200 rounded-lg p-6 opacity-60">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <HardDrive className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">Cloud Storage</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          Tích hợp với các dịch vụ lưu trữ đám mây khác (Sắp có)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'system' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">System Settings</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-900 mb-2">System Information</div>
                    <div className="text-sm text-blue-700 space-y-1">
                      <div>Version: 1.0.0</div>
                      <div>Last Updated: 2024-01-15</div>
                      <div>Database: Connected</div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    Clear Cache
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;