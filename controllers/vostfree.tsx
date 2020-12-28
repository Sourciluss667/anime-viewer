// vostfree.com (Site d'anime FR et VOSTFR)
import cheerio from 'cheerio'
import { SearchResultData, EpisodesObject } from '../types'

export async function getAllEpisodes (uri: string): Promise<Array<EpisodesObject> | undefined> {
  try {
    const result: Array<EpisodesObject> = []
    const uriTemp: Array<string> = []

    const res = await fetch(uri, {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    },
    "referrer": "https://vostfree.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
    });

    let $ = cheerio.load(await res.text())
    $('.player_box').each(function (this: cheerio.Element, i, e) {
      const uri = $(this).text()
      if (/^\d+$/.test(uri) && uri.length === 7) {
        // Normalement c'est Sibnet
        uriTemp.push('https://video.sibnet.ru/shell.php?videoid=' + uri)
      }
    })

    let $text = cheerio.load($('select.new_player_selector').html() + '')
    $text('option').each(function (this: cheerio.Element, i, e) {
      result.push({text: $text(this).text(), uri: uriTemp[i]})
      console.log(result[i].text + ' : ' + result[i].uri)
    })

    console.log('text: ' + result.length + ' | uri: ' + uriTemp.length)

    return result
  } catch (e) {
    console.error(e)
  }
}

async function getiFrame () {
  // div a chopé .new_player_content
  console.log('test')
}

export async function searchByTitle(searchStr: string): Promise<Array<SearchResultData> | null | undefined> {
  try {
    const res = await fetch("https://vostfree.com/", {
      "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
      "cache-control": "max-age=0",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "same-origin",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    },
    "referrer": "https://vostfree.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "do=search&subaction=search&story=" + searchStr + "&submit=Envoyer",
    "method": "POST",
    "mode": "cors"
    })
    
    let result = Array<SearchResultData>()
    let $ = cheerio.load(await res.text())

    $('div.search-result').each(function (this: cheerio.Element, i, e) {
      const title = cheerio.load($(this).html() + '')('div.title').text().replace(' FRENCH', '').replace(' VOSTFR', '')
      const img = 'https://vostfree.com' + cheerio.load($(this).html() + '')('span.image').children().attr('src')
      const desc = cheerio.load($(this).html() + '')('div.desc').text().trimStart()
      const version = cheerio.load($(this).html() + '')('div.quality').text()
      const totalEp = cheerio.load($(this).html() + '')('div.year').text().substring('Episode'.length + 1)
      const uri = cheerio.load($(this).html() + '')('div.title').children().attr('href') + ''

      result.push({ id: i.toString(), title, img, desc, version, totalEp, uri })
    })

    if (result.length === 0) {
      console.log("Don't find animes !")
      return null
    }
    return result
  } catch (e) {
    console.error(e)
  }
}