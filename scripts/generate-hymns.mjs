import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from 'docx';
import fs from 'fs';
import path from 'path';

const hymns = [
  // English
  {
    slug: 'amazing-grace',
    title: 'Amazing Grace',
    language: 'English',
    key: 'G',
    chords: 'G - D - Em - C - G',
    lyrics: `Amazing grace, how sweet the sound
That saved a wretch like me
I once was lost, but now am found
Was blind, but now I see

'Twas grace that taught my heart to fear
And grace my fears relieved
How precious did that grace appear
The hour I first believed

Through many dangers, toils and snares
I have already come
'Tis grace hath brought me safe thus far
And grace will lead me home`,
  },
  // Zulu
  {
    slug: 'sthandwa-sami',
    title: 'Sthandwa Sami',
    language: 'Zulu',
    key: 'C',
    chords: 'C - Am - F - G',
    lyrics: `Sthandwa sami, God is love
Ngidinga nkos', ngidinga
Nkosi yang', hamba na mi
Ngidinga nkos', ngidinga

Haleluya, Haleluya
Haleluya nonofolo
Haleluya, Haleluya
Ngiyabonga Nkosi`,
  },
  {
    slug: 'jesu-usuqhamo-njani',
    title: 'Jesu, Usuqhamo Njani?',
    language: 'Zulu',
    key: 'D',
    chords: 'D - A - Bm - G',
    lyrics: `Nkosi uyihlo kanye noMoya oyingcwele
Wadala amazulu, wenza konke okuhlelekile
Ungabikiwa, awufuni muntu akushade
Wena wedwa uyabonga, ungcwele wedwa

Jesu, usuqhamo njani?
Indlela yokuphila kwabantu bonke
Jesu, usuqhamo njani?
Uyingelezo lwanoma ngubani?`,
  },
  {
    slug: 'igama-lakho',
    title: 'Igama Lakho Lindumile',
    language: 'Zulu',
    key: 'A',
    chords: 'A - E - F#m - D',
    lyrics: `Igama lakho liyavikela
Amandla akho ayakwamukela
Ungcwele, ungcwele, ungcwele
Igama lakho lihlekile

Haleluya! Haleluya!
Igama lakho Nkosi
Haleluya! Haleluya!
Liyavikela bonke`,
  },
  {
    slug: 'nkosi-yakwami',
    title: 'Nkosi Yakwami',
    language: 'Zulu',
    key: 'G',
    chords: 'G - D - Em - C',
    lyrics: `Nkosi yakwami uyabusa
Izulu nomhlaba ziyakuhlambela
Amandla namulumo
Wena wedwa Nkosi

Haleluya, Nkosi yami
Wena unguqukile
Haleluya, Nkosi yami
Ngiyabonga wena`,
  },
  // Xhosa
  {
    slug: 'nkosi-yam',
    title: 'Nkosi Yam',
    language: 'Xhosa',
    key: 'A',
    chords: 'A - E - F#m - D',
    lyrics: `Nkosi yam, wena ungcwele
Ndinika ithuba lokubonga
Ndinika ithuba lokuvinga
Wena wedwa, Nkosi yam

Haleluya! Haleluya!
Nkosi yam ungcwele
Haleluya! Haleluya!
Igama lakho lihlekile`,
  },
  {
    slug: 'nantsi-inkonjana',
    title: "Nants'inkonjane",
    language: 'Xhosa',
    key: 'G',
    chords: 'G - D - Em - C',
    lyrics: `Nants'inkonjane ethi nyana
Ihambe yayihamba yayikhonza
Isoloko icela uThixo
Ukuba anike isibindi

Haleluya, haleluya
UThixo uyavikela
Haleluya, haleluya
Abantwana bakhe bonke`,
  },
  // Sotho
  {
    slug: 'molomo-oa-botho',
    title: 'Molomo oa Botho',
    language: 'Sotho',
    key: 'G',
    chords: 'G - D - Em - C',
    lyrics: `Molomo oa Botho oa ntumelloa
Lesotho le lona le khotlehileng
Ha re ke re thapelong
Re kopanya molomo oa koahelo

Haleluya! Haleluya!
Botho ba Ntate
Haleluya! Haleluya!
Rea leboha`,
  },
  {
    slug: 'ke-mo-o-lapeng',
    title: 'Ke Moo Lapeng',
    language: 'Sotho',
    key: 'C',
    chords: 'C - G - Am - F',
    lyrics: `Ke moo lapeng ha a selo se joalo
Le ha matsoho a nka letho
Ke moo lapeng ha a molato
Etswe ke botho ba ntumelo

Haleluya! Haleluya!
Ke moo lapeng
Haleluya! Haleluya!
Nkgo ya ka e na le wena`,
  },
  // Tswana
  {
    slug: 'modimo-o-bogasi',
    title: 'Modimo o Bogasi',
    language: 'Tswana',
    key: 'G',
    chords: 'G - D - Em - C',
    lyrics: `Modimo o bogasi thata
O nale boxamadi thata
Re tsholwa ke wena
Re gololesega ke wena

Haleluya! Haleluya!
Modimo wa rona
Haleluya! Haleluya!
Rea leboga`,
  },
  {
    slug: 'thobo-ya-bonno',
    title: 'Thobo ya Bonno',
    language: 'Tswana',
    key: 'D',
    chords: 'D - A - G - D',
    lyrics: `Thobo ya bonno e tshwana jang
Nkgo e nna ya molamosa
Re tsholwa ke borre
Ke botho jwa mokgosi

Haleluya! Haleluya!
Thobo ya bonno
Haleluya! Haleluya!
E tshwana jang`,
  },
  // Swahili
  {
    slug: 'mungu-ni-pema',
    title: 'Mungu Ni Pema',
    language: 'Swahili',
    key: 'E',
    chords: 'E - B - C#m - A',
    lyrics: `Mungu ni pema, Mungu ni pema
Umeniokoa, uameniokoa
Kwa neema yake, kwa fahari yake
Nitakuwa daima, nitakuwa daima

Haleluya, haleluya
Mungu wa agano
Haleluya, haleluya
Sifa zako hazina kazi`,
  },
  {
    slug: 'haleluya-kristu',
    title: 'Haleluya Kristu',
    language: 'Swahili',
    key: 'D',
    chords: 'D - A - G - D',
    lyrics: `Haleluya Kristu! Mfalme wa wafalme
Haleluya Kristu! Yeye tu ni mwokozi
Kwa damu yake, alituondoa
Kwa upendo wake, tuko huru

Haleluya, haleluya!
Kristo ni baba yetu
Haleluya, haleluya!
Tukiwa pamoja na yeye`,
  },
  {
    slug: 'bwana-ni-rafiki',
    title: 'Bwana Ni Rafiki',
    language: 'Swahili',
    key: 'G',
    chords: 'G - D - Em - C',
    lyrics: `Bwana ni rafiki yangu
Yuko pamoja nami kila wakati
Hataniacha wala kuniondoka
Kwa huruma yake, nashinda

Haleluya! Haleluya!
Bwana ni rafiki
Haleluya! Haleluya!
Nim吐 na yeye`,
  },
  // Dinka
  {
    slug: 'khor-a-jesus',
    title: 'Khor a Jesus',
    language: 'Dinka',
    key: 'F',
    chords: 'F - C - Bb - F',
    lyrics: `Khor a Jesus, raan a koc
Yee adit a maber
Khor a Kristo, wongona kene
Ngolona in jok arec

Yes, Maria! Maria!
Aleli, Maria, Maria
Moses kene ayaa!
Yen a Maria!`,
  },
  {
    slug: 'koc-na-ngun',
    title: 'Koc na Ngun',
    language: 'Dinka',
    key: 'G',
    chords: 'G - D - Em - C',
    lyrics: `Koc na Ngun, yen a rec
Ayanu kere kere
Koc na Ngun, yen a maber
Ngolona in kamaic

Aleli! Aleli!
Maria nga Ngun
Aleli! Aleli!
Ngolona in jok arec`,
  },
  {
    slug: 'yen-a-juk',
    title: 'Yen a Juk',
    language: 'Dinka',
    key: 'D',
    chords: 'D - A - G - D',
    lyrics: `Yen a Juk, Juk a wan
Koc cik a dit arec
Maria, Maria!
Yen a Juk a kene

Aleli! Aleli!
Yen a Juk owi
Aleli! Aleli!
Ngolona in jok`,
  },
  // Shona
  {
    slug: 'mambo-vese-rinoita',
    title: 'Mambo Vese Rinoita',
    language: 'Shona',
    key: 'D',
    chords: 'D - G - A - D',
    lyrics: `Mambo vese rinoita
Ndaona musoro wenyu
Ndinotenda ndinotenda
Mambo vese rinoita

Halleluya! Halleluya!
Mambo wedu rinoita
Halleluya! Halleluya!
Ndaona simba rake`,
  },
  {
    slug: 'jesu-ndinamatee',
    title: 'Jesu NdinoMutee',
    language: 'Shona',
    key: 'A',
    chords: 'A - E - D - A',
    lyrics: `Jesu ndino mutee zvese
Ndino mufara zvese
Handidi zvimwe zvacharon
Ndoda iwe wedonga

Halleluya! Halleluya!
Ndino mutee iwe
Halleluya! Halleluya!
Mweya wangu wese`,
  },
  // Lingala
  {
    slug: 'nkolo-a-yesu',
    title: 'Nkolo a Yesu',
    language: 'Lingala',
    key: 'D',
    chords: 'D - A - G - D',
    lyrics: `Nkolo a Yesu akomi na bino
Akomi na bino te
Azua mokili mobimba
Nakokomba Yesu

Haleluya! Haleluya!
Nkolo a Yesu
Haleluya! Haleluya!
Akomi na bino`,
  },
  {
    slug: 'mokonzi-wa-bato',
    title: 'Mokonzi wa Bato',
    language: 'Lingala',
    key: 'G',
    chords: 'G - D - Em - C',
    lyrics: `Mokonzi wa bato, Klisto ya bankombo
Yezu Klisto, Mfumu ya bato
Akokende na biso na maye
Akosunga bato na nsuka

Haleluya! Haleluya!
Mokonzi wa bankombo
Haleluya! Haleluya!
Yezu akomi na biso`,
  },
  // Igbo
  {
    slug: 'chinedum-gi',
    title: 'Chinedum Gi',
    language: 'Igbo',
    key: 'G',
    chords: 'G - D - Em - C',
    lyrics: `Chinedum gi bu ozu oma
Ihe nile gi bu nke aka
O gbasa obi nke uwa
I meere anyi n'obi uto

Haleluya! Haleluya!
Chineke dumm
Haleluya! Haleluya!
Onyenzu nke anyi`,
  },
  {
    slug: 'onye-nwe-yo',
    title: 'Onye Nwe Yo',
    language: 'Igbo',
    key: 'D',
    chords: 'D - A - G - D',
    lyrics: `Onye nwe ya, Onye nwe ya
I bu Chukwu naigwe
I na-achikaramma n'elu
I meere uwa nile

Haleluya! Haleluya!
Onye nwe ya
Haleluya! Haleluya!
Igwe ochie`,
  },
  // Yoruba
  {
    slug: 'olorun-wole',
    title: 'Olorun Wo Le',
    language: 'Yoruba',
    key: 'G',
    chords: 'G - D - Em - C',
    lyrics: `Olorun wo le, Olorun wo le
O fowosi okan mi
O fowosi okan mi l'alafia
Olorun wo le, Olorun wo le

Haleluya! Haleluya!
Olorun wo le
Haleluya! Haleluya!
O fowosi okan mi`,
  },
  {
    slug: 'alabukun',
    title: 'Alabukun',
    language: 'Yoruba',
    key: 'C',
    chords: 'C - G - Am - F',
    lyrics: `Alabukun jijẹ ọdọ rẹ
Alabukun jẹ ẹ̀jì rẹ
O gbọ̀n igbàgbọ́ rẹ
Sinu ogo rẹ titi lai

Haleluya! Haleluya!
Alabukun
Haleluya! Haleluya!
Ọ̀run pọ̀ ju aiya lo`,
  },
  // Korean
  {
    slug: 'hannam-e-seonta',
    title: '하나님 앞에 선탄',
    language: 'Korean',
    key: 'C',
    chords: 'C - G - Am - F',
    lyrics: `하나님 앞에 선탄이여
기쁨으로 찬양하리
주의 사랑 넘치시니
이 어디까지 갔나이까

할렐루야! 할렐루야!
주의 이름 높이다
할렐루야! 할렐루야!
영광 항상 드리리`,
  },
  {
    slug: 'jeosu-chamsong',
    title: '예수님 참사랑',
    language: 'Korean',
    key: 'G',
    chords: 'G - D - Em - C',
    lyrics: `예수님 참사랑
그 사랑 받으면
온 세상 부러워
하지 않아요

할렐루야! 할렐루야!
예수님 사랑
할렐루야! 할렐루야!
참사랑이십니다`,
  },
  {
    slug: 'nallimyeo',
    title: '날찌며 버티는 사랑',
    language: 'Korean',
    key: 'A',
    chords: 'A - E - D - A',
    lyrics: `날찌며 버디는 사랑
세월이 가도 변하지 않는
그 사랑 하나에 모든 소원이
충분하옵니다

할렐루야! 할렐루야!
그 사랑으로
할렐루야! 할렐루야!
오늘도 살아가입니다`,
  },
  // Amharic
  {
    slug: 'mela-new',
    title: 'Mela New',
    language: 'Amharic',
    key: 'G',
    chords: 'G - D - Em - C',
    lyrics: `Mela new, Mela new
Kristos yetekefelnew
Yetekefelnew yehihu
Inji yetafashamey

Haleluya! Haleluya!
Mela new
Haleluya! Haleluya!
Yetekefelew`,
  },
  {
    slug: 'yene-yene',
    title: 'Yene Yene',
    language: 'Amharic',
    key: 'A',
    chords: 'A - E - D - A',
    lyrics: `Yene yene, yene yene
Yesetena new
Yesetena new yehihu
Tirkwir yibelew

Haleluya! Haleluya!
Yene yene
Haleluya! Haleluya!
Yesetena new`,
  },
  // Pedi
  {
    slug: 'ntlo-thaba',
    title: 'Ntlo ya Thaba',
    language: 'Pedi',
    key: 'G',
    chords: 'G - D - Em - C',
    lyrics: `Ntlo ya thaba e a ke kgona
Thaba e the fela ka moloto
Bohlatswana ba bangwe bao
Ba bonafatšego ka moloto

Haleluya! Haleluya!
Ntlo ya thaba
Haleluya! Haleluya!
E tla se go realo`,
  },
  {
    slug: 'moloto-wa-betha',
    title: 'Moloto wa Betha',
    language: 'Pedi',
    key: 'C',
    chords: 'C - G - Am - F',
    lyrics: `Moloto wa betha wo o swerago
Ke tshwanelo ya batho
Re begofaditše ka bophelong
Re tshwantšhitše moloto

Haleluya! Haleluya!
Moloto wa betha
Haleluya! Haleluya!
Re begofaditše ka wena`,
  },
  // Ndebele
  {
    slug: 'muden-iwe',
    title: 'Mundeni Iwe',
    language: 'Ndebele',
    key: 'G',
    chords: 'G - D - Em - C',
    lyrics: `Mundeni iwe Ndumiso
Igama lakho lihlekile
Wonke umuntu uyabonga
Lapho ufika khona

Haleluya! Haleluya!
Mundeni iwe
Haleluya! Haleluya!
Igama lakho lihlekile`,
  },
  {
    slug: 'inkosi-yethu',
    title: 'INKOSI YETHU',
    language: 'Ndebele',
    key: 'A',
    chords: 'A - E - D - A',
    lyrics: `INKOSI YETHU iyinhloko
Ngokuyalela ngokuthula
Sizakwamukela bonke
Ngokuhlambuluka kwenhliziyo

Haleluya! Haleluya!
INKOSI YETHU
Haleluya! Haleluya!
Yinhloko phakathi kwabantu bonke`,
  },
];

async function createHymnDocx(hymn) {
  const sections = [];

  // Title
  sections.push(
    new Paragraph({
      text: hymn.title,
      heading: HeadingLevel.TITLE,
      alignment: AlignmentType.CENTER,
    })
  );

  // Metadata
  sections.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Language: ', bold: true }),
        new TextRun({ text: hymn.language }),
      ],
    })
  );

  sections.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Key: ', bold: true }),
        new TextRun({ text: hymn.key }),
      ],
    })
  );

  sections.push(
    new Paragraph({
      children: [
        new TextRun({ text: 'Chords: ', bold: true }),
        new TextRun({ text: hymn.chords }),
      ],
    })
  );

  // Separator
  sections.push(
    new Paragraph({
      text: '═══════════════════════════════════════',
      alignment: AlignmentType.CENTER,
    })
  );

  // Lyrics
  sections.push(
    new Paragraph({
      text: 'LYRICS',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
    })
  );

  const verses = hymn.lyrics.split('\n\n');
  for (const verse of verses) {
    const lines = verse.split('\n');
    for (const line of lines) {
      sections.push(
        new Paragraph({
          text: line,
          alignment: AlignmentType.CENTER,
        })
      );
    }
    sections.push(new Paragraph({ text: '' }));
  }

  // Footer
  sections.push(
    new Paragraph({
      text: '═══════════════════════════════════════',
      alignment: AlignmentType.CENTER,
    })
  );

  sections.push(
    new Paragraph({
      text: 'Johannesburg Bible Study Church',
      alignment: AlignmentType.CENTER,
    })
  );

  sections.push(
    new Paragraph({
      text: 'www.joburgchurch.co.za/hymns',
      alignment: AlignmentType.CENTER,
    })
  );

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: sections,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join('public', 'hymns', `${hymn.slug}.docx`);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Created: ${outputPath}`);
}

async function main() {
  if (!fs.existsSync('public/hymns')) {
    fs.mkdirSync('public/hymns', { recursive: true });
  }

  for (const hymn of hymns) {
    await createHymnDocx(hymn);
  }

  console.log(`\nCreated ${hymns.length} hymn files.`);
}

main().catch(console.error);
