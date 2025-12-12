import httpClient from '~/services/httpClient'

export interface YouTubeUploadMetadata {
  title: string
  description?: string
  tags?: string[]
  privacyStatus?: 'public' | 'unlisted' | 'private'
  categoryId?: string
  defaultLanguage?: string
  defaultAudioLanguage?: string
  notifySubscribers?: boolean
}

export interface YouTubeVideoDto {
  videoId: string
  title: string
  description?: string
  thumbnailUrl: string
  videoUrl: string
  embedUrl: string
  privacyStatus: string
  publishedAt: string
  viewCount?: number
  likeCount?: number
  commentCount?: number
  duration?: string
}

export interface YouTubeUploadResponse {
  isSuccess: boolean
  value: YouTubeVideoDto | null
  error: {
    code: string
    message: string
  } | null
}

export const youtubeUploadService = {
  /**
   * API 3: Upload Video (Instructor/Admin)
   * POST /api/youtube/upload
   * Upload video file lên YouTube
   */
  uploadVideo: (
    videoFile: File,
    metadata: YouTubeUploadMetadata,
    onProgress?: (progress: number) => void
  ): Promise<YouTubeVideoDto> => {
    const formData = new FormData()
    formData.append('videoFile', videoFile)
    formData.append('Title', metadata.title)

    if (metadata.description) {
      formData.append('Description', metadata.description)
    }

    if (metadata.tags && metadata.tags.length > 0) {
      formData.append('Tags', metadata.tags.join(','))
    }

    if (metadata.privacyStatus) {
      formData.append('PrivacyStatus', metadata.privacyStatus)
    }

    if (metadata.categoryId) {
      formData.append('CategoryId', metadata.categoryId)
    }

    if (metadata.defaultLanguage) {
      formData.append('DefaultLanguage', metadata.defaultLanguage)
    }

    if (metadata.defaultAudioLanguage) {
      formData.append('DefaultAudioLanguage', metadata.defaultAudioLanguage)
    }

    if (metadata.notifySubscribers !== undefined) {
      formData.append('NotifySubscribers', metadata.notifySubscribers.toString())
    }

    // Sử dụng XMLHttpRequest để track upload progress
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable && onProgress) {
          const progress = (e.loaded / e.total) * 100
          onProgress(progress)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          try {
            const data: YouTubeUploadResponse = JSON.parse(xhr.responseText)
            if (data.isSuccess && data.value) {
              resolve(data.value)
            } else {
              reject(new Error(data.error?.message || 'Upload failed'))
            }
          } catch (error) {
            reject(new Error('Failed to parse response'))
          }
        } else {
          try {
            const data: YouTubeUploadResponse = JSON.parse(xhr.responseText)
            reject(new Error(data.error?.message || `Upload failed with status ${xhr.status}`))
          } catch {
            reject(new Error(`Upload failed with status ${xhr.status}`))
          }
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error('Network error'))
      })

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload cancelled'))
      })

      const token = localStorage.getItem('accessToken')
      const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:7151/api'
      
      xhr.open('POST', `${baseURL}/youtube/upload`)
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      }
      xhr.send(formData)
    })
  }
}

