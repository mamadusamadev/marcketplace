"use client"

import { useState, useEffect } from "react"

interface TrafficDataParams {
  startDate: string
  endDate: string
  filter?: string
}

export function useTrafficData({ startDate, endDate, filter = "all" }: TrafficDataParams) {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/analytics/traffic?startDate=${startDate}&endDate=${endDate}&filter=${filter}`,
        )

        if (!response.ok) {
          throw new Error(`Error fetching traffic data: ${response.status}`)
        }

        const result = await response.json()
        setData(result)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [startDate, endDate, filter])

  const refetch = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/analytics/traffic?startDate=${startDate}&endDate=${endDate}&filter=${filter}`)

      if (!response.ok) {
        throw new Error(`Error fetching traffic data: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error occurred"))
    } finally {
      setIsLoading(false)
    }
  }

  return { data, isLoading, error, refetch }
}
