import { useContext} from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";

import {PriceHighlight, TransactionsContainer, TransactionsTable} from './styles'
import { TransactionsContext } from "../../contexts/TransactionContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

interface TransactionsProps {
    id: number,
    description: string,
    type: 'income' | 'outcome',
    price: number,
    category: string,
    createdAt: string
}

export function Transactions () {
    const {transactions} = useContext(TransactionsContext)

    return <div>
        <Header />
        <Summary />
        
        <TransactionsContainer>
        <SearchForm />
            <div style={{height: '30rem', overflowY: 'auto'}}>
            <TransactionsTable>
                <tbody>
                    {transactions.map(({id, description, type, price, category, createdAt}: TransactionsProps)=> (<tr key={id}>
                        <td width="50%">{description}</td>
                        <td><PriceHighlight variant={type}>{priceFormatter.format(price)}</PriceHighlight></td>
                        <td>{category}</td>
                        <td>{dateFormatter.format(new Date(createdAt))}</td>
                    </tr>)) }
                </tbody>
            </TransactionsTable>
            </div>
        </TransactionsContainer>
    </div>
}