'use client'

import { useCallback, useEffect } from 'react'
import { useTx } from '@/lib/hooks/transaction'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import _ from 'lodash'
import { useParams, useRouter } from 'next/navigation'
import { txCreateRewardAccount } from '@/lib/txs/create-reward-account'
import { useConnection } from '@/lib/providers/connection'
import { ChevronLeftIcon } from '@radix-ui/react-icons'

const createRewardAccountFormSchema = z.object({
  label: z.string(),
  durationSec: z.number().min(0),
  denom: z.string(),
  microAmount: z.number().min(0),
})

type CreateRewardAccountFormSchema = z.infer<
  typeof createRewardAccountFormSchema
>

export default function CreateRewardAccount() {
  const router = useRouter()
  const params = useParams()
  const { signingCwClient, sender, exec } = useTx()

  const nftVaultAddress = params.vaultAddress as string

  const createVaultForm = useForm<CreateRewardAccountFormSchema>({
    resolver: zodResolver(createRewardAccountFormSchema),
    defaultValues: {
      durationSec: 0,
      denom: '',
    },
  })

  const onSubmit = useCallback(
    async (data: CreateRewardAccountFormSchema) => {
      if (!signingCwClient || !sender) {
        return
      }

      try {
        await exec(
          'Create Reward Account',
          txCreateRewardAccount.bind(
            null,
            signingCwClient,
            sender,
            nftVaultAddress,
            data.label,
            data.durationSec,
            {
              denom: data.denom,
              amount: data.microAmount.toString(),
            },
          ),
        )

        router.push(`/vaults/${nftVaultAddress}`)
      } catch (e) {
        console.error(e)
      }
    },
    [signingCwClient, sender, exec, nftVaultAddress, router],
  )

  return (
    <div className="max-w-screen-md flex flex-col justify-start items-center space-y-12 py-16 mx-auto">
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <Button
          variant="outline"
          onClick={() => router.push(`/vaults/${nftVaultAddress}`)}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Reward Account</h1>
        <Form {...createVaultForm}>
          <form
            onSubmit={createVaultForm.handleSubmit(onSubmit)}
            className="flex flex-col justify-start items-center space-y-8"
          >
            <FormField
              control={createVaultForm.control}
              name="label"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row justify-center items-center space-x-2 space-y-0">
                    <FormLabel className="font-light w-64">Label</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={createVaultForm.control}
              name="durationSec"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row justify-center items-center space-x-2 space-y-0">
                    <FormLabel className="font-light w-64">
                      Reward Duration (seconds)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={createVaultForm.control}
              name="denom"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row justify-center items-center space-x-2 space-y-0">
                    <FormLabel className="font-light w-64">Denom</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={createVaultForm.control}
              name="microAmount"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row justify-center items-center space-x-2 space-y-0">
                    <FormLabel className="font-light w-64">
                      Micro Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
