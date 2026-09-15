import type { ComponentProps, FC } from 'react'

import { cn } from '@/lib/cn.js'

// Exploratory: filled-silhouette fallback content for AvatarFallback,
// alongside the icon-reuse style demoed in stories (Icon + UserRound/
// PawPrint from @pawks/icons). Deliberately a design-system exception to
// §15's stroke-only icon convention — kept as separate opt-in content
// rather than a prop on AvatarFallback itself, pending a decision on
// which style to keep. `fill="currentColor"` means these inherit
// AvatarFallback's `text-muted-foreground` automatically, so they theme
// correctly across every coat/mode with no extra work.

export type AvatarFallbackPersonImageProps = ComponentProps<'svg'>

export const AvatarFallbackPersonImage: FC<AvatarFallbackPersonImageProps> = ({ className, ...props }) => (
	<svg viewBox='0 0 24 24' fill='currentColor' className={cn('size-full', className)} aria-hidden='true' {...props}>
		<circle cx='12' cy='8' r='4' />
		<path d='M4 24v-2a8 8 0 0 1 16 0v2z' />
	</svg>
)

export type AvatarFallbackPetImageProps = ComponentProps<'svg'>

export const AvatarFallbackCatImage: FC<AvatarFallbackPetImageProps> = ({ className, ...props }) => (
	<svg
		viewBox='0 0 24 24'
		fill='currentColor'
		aria-hidden='true'
		version='1.1'
		id='svg1'
		width='24'
		height='24'
		xmlns='http://www.w3.org/2000/svg'
		className={cn('size-full', className)}
		{...props}
	>
		<path d='m 4,26.515238 v -2 a 8,8 0 0 1 16,0 v 2 z' id='path1' />
		<g id='g14' transform='matrix(0.87337787,0,0,0.87337787,1.522747,3.7840733)'>
			<path
				id='path9'
				style={{
					fill: 'currentColor',
					stroke: 'currentColor',
					strokeWidth: 0.2,
					strokeLinecap: 'round',
					strokeLinejoin: 'round',
					strokeDasharray: 'none',
					paintOrder: 'markers fill stroke',
				}}
				d='m 6.7717855,11.156785 -1.0828359,0.613479 z m 0.3228906,0.484867 -1.2964064,0.992883 z'
			/>
			<path
				id='path16'
				style={{
					fill: 'currentColor',
					stroke: 'currentColor',
					strokeWidth: 0.203313,
					strokeLinecap: 'round',
					strokeLinejoin: 'round',
					strokeDasharray: 'none',
					paintOrder: 'markers fill stroke',
				}}
				d='m 17.24971,11.145393 1.11154,0.617596 z m -0.331449,0.488119 1.330772,0.999549 z'
			/>
		</g>
		<path
			id='circle1'
			d='m 8.3391884,6.1926857 c -0.033424,-0.00185 -0.087426,0.00335 -0.1194071,0.011941 -0.1887989,0.050734 -0.5518222,0.260749 -0.6823265,0.692561 -0.2276616,0.7532855 -0.2106451,1.2951693 -0.1791107,1.8917501 0.031534,0.596581 0.1726705,0.9792109 0.05828,1.5159052 -0.1143915,0.536693 -0.2373825,0.99958 -0.2373905,1.472671 -6.055e-4,2.120727 2.159476,3.840084 4.8240484,3.839801 2.664572,2.83e-4 4.824653,-1.719074 4.824047,-3.839801 4e-6,-0.513327 -0.129346,-1.02144 -0.263571,-1.515402 -0.134225,-0.4939636 0.0069,-0.8765935 0.03845,-1.4731745 0.03153,-0.5965809 0.04855,-1.1384647 -0.17911,-1.8917501 -0.130549,-0.4318117 -0.493572,-0.641826 -0.682371,-0.692561 -0.03198,-0.00859 -0.08598,-0.013788 -0.119407,-0.011941 -0.189373,0.010467 -0.556774,0.1183309 -0.798322,0.2968121 -0.449239,0.3319463 -0.449937,0.4695268 -1.240128,1.1019571 -0.233087,0.1865515 -0.612523,0.3657886 -0.883614,0.3872203 -0.271089,0.021432 -0.463095,-0.00598 -0.695971,-0.00567 -0.243231,-3.877e-4 -0.448373,0.028796 -0.726678,0.00908 C 10.998299,7.9623704 10.614712,7.7811968 10.377638,7.5914549 9.5874477,6.9590245 9.5884555,6.821444 9.1392161,6.4894977 8.8976689,6.3110166 8.5285612,6.2031528 8.3391884,6.1926857 Z'
			style={{
				fill: 'currentColor',
				stroke: 'currentColor',
				strokeWidth: 0.05,
				strokeDasharray: 'none',
			}}
		/>
	</svg>
)
export const AvatarFallbackDogImage: FC<AvatarFallbackPetImageProps> = ({ className, ...props }) => (
	<svg
		viewBox='0 0 24 24'
		fill='currentColor'
		aria-hidden='true'
		version='1.1'
		id='svg1'
		xmlSpace='preserve'
		width='576'
		height='576'
		xmlns='http://www.w3.org/2000/svg'
		className={cn('size-full', className)}
		{...props}
	>
		<path d='m 4,26.515238 v -2 a 8,8 0 0 1 16,0 v 2 z' id='path1' />
		<path
			id='path16'
			style={{
				display: 'inline',
				fill: 'currentColor',
				stroke: 'currentColor',
				strokeWidth: 0.2,
				strokeLinecap: 'round',
				strokeLinejoin: 'round',
				paintOrder: 'markers fill stroke',
			}}
			d='M 12.155753,5.7042818 C 11.344643,5.7179464 9.7877438,5.9366847 9.1637598,6.4250411 8.5397756,6.9133975 8.5843948,6.471517 8.0402007,6.791979 7.4293181,7.1517122 7.074905,7.8136963 6.7884856,8.2055538 6.5020661,8.5974112 5.6063394,8.9999858 5.4482872,9.2457723 5.2902349,9.4915588 5.1678578,9.9842475 5.4806591,10.838472 c 0.3128014,0.854223 2.1067633,2.807166 2.3588356,2.660973 0.2520722,-0.146192 0.3923256,-0.636542 0.5308998,-1.079064 0.1385743,-0.442522 0.1978857,-1.007449 0.332352,-0.956052 h 0.00215 0.00215 0.00215 l 0.00215,-0.0022 c 0.010928,-0.01028 0.027383,-0.04145 0.045321,-0.08849 0.00241,0.0056 0.00404,0.01164 0.00648,0.01727 0.1554389,0.359058 0.8248719,0.983889 0.7790848,1.728662 -0.032051,0.521329 -0.1735337,1.045563 0.047479,1.426524 0.5158667,0.889182 1.8767427,1.26185 2.6329177,1.249557 0.0063,-1.03e-4 0.01323,-8.98e-4 0.01943,-0.0022 0.0062,0.0012 0.01312,0.0021 0.01943,0.0022 0.756175,0.0123 2.11705,-0.360375 2.632917,-1.249557 0.221013,-0.380961 0.07737,-0.905195 0.04533,-1.426524 -0.04579,-0.744773 0.625804,-1.369604 0.781242,-1.728662 0.003,-0.0069 0.0057,-0.01465 0.0086,-0.02158 0.01692,0.04478 0.0323,0.07555 0.04316,0.08849 9.33e-4,8.94e-4 0.0034,0.0059 0.0043,0.0065 h 0.0022 0.0022 0.0022 c 0.134466,-0.05139 0.195935,0.51353 0.33451,0.956052 0.138573,0.442522 0.27667,0.932872 0.528742,1.079064 0.252073,0.146193 2.046033,-1.80675 2.358835,-2.660973 C 19.318524,9.9842375 19.19615,9.4915488 19.038105,9.2457623 18.879976,8.9999858 17.984251,8.5974112 17.697831,8.2055538 17.41141,7.8136963 17.056998,7.1517122 16.446115,6.791979 15.899263,6.4699515 15.948356,6.9188663 15.321305,6.4277755 14.694253,5.9366847 13.139516,5.7179465 12.328404,5.7042818 c -0.02968,-5.003e-4 -0.0586,0.012532 -0.08632,0.038846 -0.02773,-0.026314 -0.05664,-0.039347 -0.08633,-0.038846 z'
		/>
	</svg>
)
