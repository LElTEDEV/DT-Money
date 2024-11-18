import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionContext";

const newTransactionFormSchema = z.object({
    description: z.string().trim(),
    price: z.number().min(0),
    category: z.string().trim(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
    const {createTransaction} = useContext(TransactionsContext)

    const {register, handleSubmit, control, reset} = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema)
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        createTransaction(data)
        reset()
    } 

    return(
        <Dialog.Portal>
            <Overlay />

            <Content>
                <Dialog.Title>Nova transação</Dialog.Title>
                <CloseButton>
                    <X size={24}/>
                </CloseButton>


                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input type="text" placeholder="Descrição" required {...register('description')} />
                    <input type="number" placeholder="Preço" required {...register('price', {valueAsNumber: true})} />
                    <input type="text" placeholder="Categoria" required {...register('category')} />

                    <Controller control={control} name="type" render={({field}) => (
                        <TransactionType onValueChange={field.onChange} value={field.value}>
                            <TransactionTypeButton variant="income" value="income" >
                                <ArrowCircleUp size={24}/>
                                Entrada
                            </TransactionTypeButton>
                            <TransactionTypeButton variant="outcome" value="outcome" >
                                <ArrowCircleDown size={24} />
                                Saída
                            </TransactionTypeButton>
                        </TransactionType>
                    )}/>

                    <button type="submit">Cadastrar</button>
                </form>
                

            </Content>
            
        </Dialog.Portal>
    )
}