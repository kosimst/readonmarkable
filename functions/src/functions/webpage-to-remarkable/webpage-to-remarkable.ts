import callableFunction, { HttpsError } from '../../helpers/callable-functions'

import { Readability } from '@mozilla/readability'
import { JSDOM } from 'jsdom'
import { readFileSync } from 'fs'
import { Remarkable } from 'remarkable-typescript'
import * as path from 'path'

const Epub = require('epub-gen')

const webpageToRemarkable = callableFunction<'webpageToRemarkable'>(
  async ({ token, url }) => {
    try {
      const articlePath =
        process.env.FUNCTIONS_EMULATOR == 'true'
          ? path.join(__dirname, 'article.epub')
          : `/tmp/article.epub`
      const tempDir = process.env.FUNCTIONS_EMULATOR == 'true' ? '' : `/tmp`

      const jsdom = await JSDOM.fromURL(url)

      const isWikipedia = url.includes('wikipedia')

      const links = jsdom.window.document.getElementsByTagName('a')
      for (let i = 0; i < links.length; i++) {
        const link = links.item(i)

        if (link?.textContent?.includes('[')) {
          link.innerHTML = ''
        }

        if (
          ['v', 't', 'e'].includes(link?.textContent || '') &&
          link?.parentElement?.parentElement?.parentElement?.parentElement
            ?.parentElement
        ) {
          link.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML =
            ''
        }

        link?.removeAttribute('href')
      }

      const editLinks = jsdom.window.document.getElementsByClassName(
        'mw-editsection'
      )
      for (let i = 0; i < editLinks.length; i++) {
        const link = editLinks.item(i)

        if (link) link.innerHTML = ''
      }

      const reader = new Readability(jsdom.window.document)
      const article = reader.parse()

      if (!article) throw new Error('Failed to parse article')

      const {
        title: titleRaw,
        content: contentRaw,
        excerpt,
        siteName,
      } = article

      const title = titleRaw.replace(': ', ' - ').replace(/"/g, '')
      let content = contentRaw as string

      const sections = new Map<string, string>()
      const readableJsdom = new JSDOM(content)

      if (isWikipedia) {
        const language = url.split('.wiki')[0].split('://')[1]

        const children =
          readableJsdom.window.document.body.children[0].children[0].children

        const tables = language === 'de' ? 'Tabellen' : 'Tables'
        const overview = language === 'de' ? 'Übersicht' : 'Overview'
        let currentKey = tables

        for (let i = 0; i < children.length; i++) {
          const child = children.item(i)

          const tagName = child?.tagName

          if (tagName === 'TABLE') {
            const prev = sections.get(currentKey) || ''
            const prefix = !prev ? `<h2>${tables}</h2>` : ''

            sections.set(currentKey, `${prev}${prefix}${child?.outerHTML}`)
            continue
          }
          if (
            currentKey === tables &&
            !['TABLE', 'H2', 'H3'].includes(tagName || '')
          ) {
            currentKey = overview
            const prev = sections.get(currentKey) || ''
            const prefix = !prev ? `<h2>${overview}</h2>` : ''
            sections.set(currentKey, `${prev}${prefix}${child?.outerHTML}`)
            continue
          }

          if (tagName === 'H2') {
            currentKey = child?.textContent || ''
            if (
              [
                'See also',
                'References',
                'Further Reading',
                'Weblinks',
                'Literatur',
                'Einzelnachweise',
                'Siehe auch',
              ].includes(currentKey)
            ) {
              break
            }
            sections.set(currentKey, `${child?.outerHTML}`)
            continue
          }

          const prev = sections.get(currentKey) || ''
          sections.set(currentKey, `${prev}${child?.outerHTML}`)
        }
      } else {
        sections.set('Text', content)
      }

      await new Epub(
        {
          title,
          tocTitle: title,
          content: [...sections.entries()].map(([key, value]) => ({
            title: key,
            data: value,
          })),
          appendChapterTitles: false,
          tempDir,
        },
        articlePath
      ).promise

      const client = new Remarkable({
        deviceToken: token,
      })

      await client.refreshToken()

      const fileBuffer = readFileSync(articlePath)

      await client.uploadEPUB(
        `${title}`,
        Math.floor(Math.random() * 1000000000).toString(16),
        fileBuffer
      )

      return {
        articleDescription: excerpt || 'Unknown content',
        articleName: title.replace('- Wikipedia', '').trim(),
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/7/75/Wikipedia_mobile_app_logo.png',
        pageName: siteName,
      }
    } catch (e) {
      console.error(e?.message || String(e))
      const isInvalidUrl = e?.message?.includes('Invalid URL')
      throw new HttpsError(
        isInvalidUrl ? 'invalid-argument' : 'internal',
        isInvalidUrl ? 'Invalid URL' : 'Internal error'
      )
    }
  }
)

export default webpageToRemarkable
