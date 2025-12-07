import { useState, useCallback } from 'react'

interface UsePaginationProps {
  initialPage?: number
  initialItemsPerPage?: number
}

interface UsePaginationReturn {
  currentPage: number
  setCurrentPage: (page: number) => void
  itemsPerPage: number
  setItemsPerPage: (items: number) => void
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
  resetPagination: () => void
}

export function usePagination({
  initialPage = 1,
  initialItemsPerPage = 10
}: UsePaginationProps = {}): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)

  const nextPage = useCallback(() => {
    setCurrentPage(prev => prev + 1)
  }, [])

  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }, [])

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, page))
  }, [])

  const resetPagination = useCallback(() => {
    setCurrentPage(initialPage)
    setItemsPerPage(initialItemsPerPage)
  }, [initialPage, initialItemsPerPage])

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    nextPage,
    prevPage,
    goToPage,
    resetPagination
  }
}

export default usePagination
