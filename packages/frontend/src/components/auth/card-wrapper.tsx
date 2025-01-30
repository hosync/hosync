'use client'

import { BackButton } from '@/components/auth/back-button'
import { Header } from '@/components/auth/header'
import { Social } from '@/components/auth/social'
import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

interface CardWrapperProps {
  children: React.ReactNode
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
  showSocial?: boolean
}

const CardWrapper: React.FC<CardWrapperProps> = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial = false
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>

      <CardContent>{children}</CardContent>

      <RenderBlockIf isTrue={showSocial}>
        <CardFooter>
          <Social />
        </CardFooter>
      </RenderBlockIf>

      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}

export { CardWrapper }
