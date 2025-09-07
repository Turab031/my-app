import React, { use } from 'react'
import { useQueryClient } from '@tanstack/react-query'

const useRetech = () => {
    const queryClient = useQueryClient()
    return async()=>{
        await queryClient.refetchQueries({
            type: 'active',
        })

    }
  
}

export default useRetech