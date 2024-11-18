import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface TransactionsProps {
    id: number,
    description: string,
    type: 'income' | 'outcome',
    price: number,
    category: string,
    createdAt: string
}

interface TransactionContextType {
    transactions: TransactionsProps[],
    fetchTransactions: (query?: string) => void,
    createTransaction: (data: CreateTransactionInput) => void
}

interface TransactionsProviderProps {
    children: ReactNode
}

interface CreateTransactionInput {
    description: string,
    price: number,
    category: string,
    type: 'income' | 'outcome'
}

export const TransactionsContext = createContext({} as TransactionContextType)
//
export function TransactionsProvider({children}: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<TransactionsProps[]>([])

    async function fetchTransactions(query?: string) {

        if (query) {
            const newTransactions = transactions.filter(transaction => transaction.description.toLowerCase().trim().includes(query.toLowerCase().trim()))

            if (newTransactions.length > 0) {
                return setTransactions(newTransactions)
            }
        } else {
            const response = await api.get('/transactions')

            return setTransactions(response.data)
        }
        
    }

    async function createTransaction(data: CreateTransactionInput) {
        const {category, description, price, type} = data

        const newTransaction = await api.post('/transactions', {
            description,
            price,
            category,
            type,
            createdAt: new Date()
        })

        setTransactions(atual => [...atual, newTransaction.data])
    }

    useEffect(() => {
        fetchTransactions()
    }, [])

    return <TransactionsContext.Provider value={{transactions, fetchTransactions, createTransaction}}>
        {children}
    </TransactionsContext.Provider>
}