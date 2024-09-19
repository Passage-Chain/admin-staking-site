'use client'

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { ChainSelector } from './chain-selector'
import Image from 'next/image'
import Link from 'next/link'
import { WalletMenu } from './wallet-menu'
import _ from 'lodash'
import { cn } from '@/lib/utils/utils'

const ListItem = forwardRef<ElementRef<'a'>, ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = 'ListItem'

export default function DesktopHeader() {
  return (
    <header className="flex flex-row justify-between items-center px-8 py-2 shadow-md shadow-zinc-800 bg-opacity-100 z-10 bg-black">
      <div className="flex flex-row justify-between items-center space-x-10">
        <Link href="/" className="flex flex-row items-center space-x-2">
          <Image
            className="cursor-pointer"
            src={'/logo.png'}
            alt={'Passage Logo'}
            width={50}
            height={50}
          />
          <span>Passage NFT Staking</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-row justify-between items-center space-x-10">
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="/"
              >
                <span className="text-base">Vaults</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex flex-row justify-between items-center space-x-10">
        <ChainSelector />
        <WalletMenu />
      </div>
    </header>
  )
}
