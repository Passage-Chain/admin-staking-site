'use client'

import { useCallback } from 'react'
import { useEnvVars } from '@/lib/providers/env-vars'
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
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { txCreateVault } from '@/lib/txs/create-vault'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { ChevronLeftIcon } from '@radix-ui/react-icons'

const createVaultFormSchema = z.object({
  label: z.string(),
  unstakingDurationSec: z.number().min(0),
  collections: z.array(z.string()),
})

type CreateVaultFormSchema = z.infer<typeof createVaultFormSchema>

export default function CreateVault() {
  const router = useRouter()
  const { vaultFactoryAddress } = useEnvVars()
  const { signingCwClient, sender, exec } = useTx()

  const createVaultForm = useForm<CreateVaultFormSchema>({
    resolver: zodResolver(createVaultFormSchema),
    defaultValues: {
      label: '',
      unstakingDurationSec: 0,
      collections: [],
    },
  })

  const onSubmit = useCallback(
    async (data: CreateVaultFormSchema) => {
      if (!signingCwClient || !sender) {
        return
      }

      const collections = _.reduce(
        data.collections,
        (acc: string[], collection: string) => {
          if (collection) {
            acc.push(_.trim(collection))
          }
          return acc
        },
        [],
      )

      try {
        await exec(
          'Create Vault',
          txCreateVault.bind(
            null,
            signingCwClient,
            sender,
            vaultFactoryAddress,
            data.label,
            data.unstakingDurationSec,
            collections,
          ),
        )

        router.push('/')
      } catch (e) {
        console.error(e)
      }
    },
    [signingCwClient, sender, exec, vaultFactoryAddress, router],
  )

  return (
    <div className="max-w-screen-md flex flex-col justify-start items-center space-y-12 py-16 mx-auto">
      <div className="w-full flex flex-col justify-start items-start space-y-4">
        <Button variant="outline" onClick={() => router.push(`/`)}>
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold">Create Vault</h1>
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
              name="unstakingDurationSec"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row justify-center items-center space-x-2 space-y-0">
                    <FormLabel className="font-light w-64">
                      Unstaking Duration (seconds)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
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
              name="collections"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-row justify-center items-center space-x-2 space-y-0">
                    <FormLabel className="font-light w-64">
                      Collection Addresses (comma separated)
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.split(','))
                        }
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
