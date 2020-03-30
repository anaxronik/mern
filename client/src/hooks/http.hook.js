import { useState, useCallback } from 'react';


// Функция которая получает данные с сервера
export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'Get', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message || 'Something wrong')
            }

            setLoading(false)
            return data
        } catch (error) {
            console.error(error);

            setLoading(false)
            setError(error)
            throw error
        }
    }, [])

    const clearError = () => {
        setError(null)
    }

    return { loading: loading, request, error, clearError }
}