'use client'

import { HamburgerMenuIcon, Link2Icon } from '@radix-ui/react-icons'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { Button } from '@/components/ui/button'
import { ChainSelector } from './chain-selector'
import Image from 'next/image'
import Link from 'next/link'
import { WalletMenu } from './wallet-menu'
import _ from 'lodash'

export default function MobileHeader() {
  return (
    <header className="flex flex-row justify-between items-center px-8 py-2 shadow-md shadow-zinc-800 bg-opacity-100 z-10 bg-black">
      <Link href="/">
        <Image
          className="cursor-pointer"
          src={'/stardex-logo-dark-small.svg'}
          alt={'Stardex Logo Dark'}
          width={50}
          height={50}
        />
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <HamburgerMenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent className="space-y-8">
          <SheetHeader className="flex flex-row space-x-2 justify-start items-center w-full">
            <Image
              className="cursor-pointer"
              src={'/stardex-logo-dark-small.svg'}
              alt={'Stardex Logo Dark'}
              width={50}
              height={50}
            />
            <SheetTitle>Stardex</SheetTitle>
          </SheetHeader>
          <WalletMenu />
          <ChainSelector />
          <div className="flex flex-col space-y-4 text-lg">
            <Link href="/swap">Swap</Link>
            <Link href="/pools">Pools</Link>
            <div className="flex flex-col space-y-4">
              <span>Bridge</span>
              <div className="flex flex-col space-y-4">
                <Link
                  href="https://go.skip.build"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex flex-row justify-start items-center text-base space-x-2"
                >
                  <Link2Icon />
                  <span>Bridge via Skip</span>
                </Link>
                <Link
                  href="https://app.squidrouter.com"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="flex flex-row justify-start items-center text-base space-x-2"
                >
                  <Link2Icon />
                  <span>Bridge via Squid</span>
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
