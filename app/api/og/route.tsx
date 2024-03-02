/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
// @ts-nocheck

import { Metadata } from 'next';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// export const metadata: Metadata = {
//   openGraph: {
//     images: [
//       {
//         url: 'http://localhost:3000/api/og?title=Wish%20I%20Had%20a%20Boner',
//         width: 1200,
//         height: 630,
//         alt: 'Boner',
//       },
//     ],
//   },
// };

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const hasTitle = searchParams.has('title');
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Default Title';

    const fontData = await fetch(
      new URL('../../../assets/fonts/Poppins-Black.ttf', import.meta.url)
    ).then(res => res.arrayBuffer());

    const imageData = await fetch(
      new URL('../../../assets/images/skull.png', import.meta.url)
    ).then(res => res.arrayBuffer());

    return new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full items-center justify-center bg-pink-300">
          <div tw="bg-nipple flex w-full">
            <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
              <img width={128} height={128} src={imageData} />
              <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-black text-left">
                <span tw="text-transform: uppercase">{title}</span>
                <span tw="text-yellow-300">
                  Bootstrap a treasury, Start a DAO
                </span>
              </h2>
              <div tw="mt-8 flex md:mt-0">
                <div tw="flex rounded-md shadow"></div>
                <div tw="ml-3 flex rounded-md shadow">
                  <a tw="flex items-center justify-center rounded-md border border-transparent bg-amber-100 px-20 py-3 text-base text-transform: uppercase font-medium text-black">
                    Yeet
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        emoji: 'twemoji',
        fonts: [
          {
            name: 'Poppins',
            data: fontData,
            style: 'normal',
          },
        ],
      }
    );
  } catch (e: any) {
    return new Response('Failed to generate OG image.', { status: 500 });
  }
}
