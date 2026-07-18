/**
 * Shared hymn data — used by:
 *   • /hymns/                    (listing)
 *   • /hymns/[slug]/             (detail page)
 *   • scripts/generate-hymns-docx.mjs (docx generation)
 *
 * Adding a song here automatically:
 *   - adds it to the listing
 *   - generates /hymns/<slug>/ page
 *   - generates public/hymns/<slug>.docx on build
 *
 * The `youtubeId` field is the YouTube video ID for the OFFICIAL
 * or most-popular music video. Where we don't pin a specific video
 * (to avoid stale links), the YouTube embed uses the search query
 * built from `youtubeSearch` (or `title` by default).
 */

export type Hymn = {
  slug: string;
  title: string;
  alternateTitle?: string;
  language: string;
  languageName: string;
  key?: string;
  chords?: string;
  image: string;
  excerpt: string;
  tags: string[];
  region: string;
  popularity?: string;
  // Social / audio
  youtubeId?: string;          // 11-char YouTube video id, if we know a good one
  youtubeSearch?: string;      // free-form search; used as fallback
  artist?: string;             // primary artist for credit + search
  releasedYear?: number;
  // Lyrics — text body. Use blank lines to separate verses/chorus.
  lyrics?: string;
};

export const languages = [
  { code: 'all', name: 'All Languages' },
  { code: 'zulu', name: 'Zulu / isiZulu' },
  { code: 'xhosa', name: 'Xhosa / isiXhosa' },
  { code: 'sotho', name: 'Sotho / Sesotho' },
  { code: 'tswana', name: 'Tswana / Setswana' },
  { code: 'pedi', name: 'Pedi / Sepedi' },
  { code: 'ndebele', name: 'Ndebele / isiNdebele' },
  { code: 'afrikaans', name: 'Afrikaans' },
  { code: 'swahili', name: 'Swahili / Kiswahili' },
  { code: 'dinka', name: 'Dinka (South Sudan)' },
  { code: 'shona', name: 'Shona (Zimbabwe)' },
  { code: 'lingala', name: 'Lingala (DRC)' },
  { code: 'igbo', name: 'Igbo (Nigeria)' },
  { code: 'yoruba', name: 'Yoruba (Nigeria)' },
  { code: 'amharic', name: 'Amharic (Ethiopia)' },
  { code: 'french', name: 'French / Français' },
  { code: 'portuguese', name: 'Portuguese / Português' },
  { code: 'spanish', name: 'Spanish / Español' },
  { code: 'german', name: 'German / Deutsch' },
  { code: 'chinese', name: 'Chinese / 中文' },
  { code: 'japanese', name: 'Japanese / 日本語' },
  { code: 'vietnamese', name: 'Vietnamese / Tiếng Việt' },
  { code: 'arabic', name: 'Arabic / العربية' },
  { code: 'hindi', name: 'Hindi / हिन्दी' },
  { code: 'indonesian', name: 'Indonesian / Bahasa' },
  { code: 'tagalog', name: 'Filipino / Tagalog' },
  { code: 'tamil', name: 'Tamil / தமிழ்' },
  { code: 'persian', name: 'Persian / فارسی' },
  { code: 'russian', name: 'Russian / Русский' },
  { code: 'english', name: 'English' },
  { code: 'korean', name: 'Korean / 한국어' },
];

export const hymns: Hymn[] = [
    {
      "slug": "amazing-grace",
      "title": "Amazing Grace",
      "language": "english",
      "languageName": "English",
      "key": "G",
      "chords": "G - D - Em - C - G",
      "image": "https://images.unsplash.com/photo-1775400713633-e4b2b3577fb7?w=800&q=80",
      "excerpt": "One of the most beloved hymns of all time. A powerful reminder of God's grace and salvation.",
      "tags": [
        "hymn",
        "english",
        "classic",
        "grace"
      ],
      "region": "Global / South Africa",
      "artist": "John Newton (1779)",
      "releasedYear": 1779,
      "youtubeId": "CDdvReNKKUk",
      "youtubeSearch": "Amazing Grace Chris Tomlin",
      "lyrics": "Amazing grace, how sweet the sound\nThat saved a wretch like me\nI once was lost, but now I'm found\nWas blind but now I see\n\n'Twas grace that taught my heart to fear\nAnd grace my fears relieved\nHow precious did that grace appear\nThe hour I first believed\n\nThrough many dangers, toils and snares\nI have already come\n'Tis grace hath brought me safe thus far\nAnd grace will lead me home\n\nWhen we've been there ten thousand years\nBright shining as the sun\nWe've no less days to sing God's praise\nThan when we'd first begun"
    },
    {
      "slug": "sthandwa-sami",
      "title": "Sthandwa Sami",
      "alternateTitle": "My Beloved / My Soul",
      "language": "zulu",
      "languageName": "Zulu",
      "key": "C",
      "chords": "C - Am - F - G",
      "image": "https://images.unsplash.com/photo-1769755410096-6c7a85d13f86?w=800&q=80",
      "excerpt": "A beautiful Zulu worship song about thirsting for God's presence.",
      "tags": [
        "hymn",
        "zulu",
        "worship",
        "traditional"
      ],
      "region": "KwaZulu-Natal, South Africa",
      "artist": "Traditional Zulu",
      "youtubeSearch": "Sthandwa Sami Zulu worship"
    },
    {
      "slug": "jesu-usuqhamo-njani",
      "title": "Jesu, Usuqhamo Njani?",
      "alternateTitle": "How Great Is Our God",
      "language": "zulu",
      "languageName": "Zulu",
      "key": "D",
      "chords": "D - A - Bm - G",
      "image": "https://images.unsplash.com/photo-1739834728302-a67c905da6fb?w=800&q=80",
      "excerpt": "Zulu translation celebrating God's greatness and majesty.",
      "tags": [
        "hymn",
        "zulu",
        "praise",
        "contemporary"
      ],
      "region": "Gauteng, South Africa",
      "artist": "Chris Tomlin (Zulu translation)",
      "youtubeSearch": "How Great Is Our God Zulu version"
    },
    {
      "slug": "igama-lakho",
      "title": "Igama Lakho Lindumile",
      "alternateTitle": "Your Name Has Been Exalted",
      "language": "zulu",
      "languageName": "Zulu",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1617099331324-5ff9fb59578c?w=800&q=80",
      "excerpt": "Powerful Zulu praise song declaring the greatness of God's name.",
      "tags": [
        "hymn",
        "zulu",
        "praise",
        "worship"
      ],
      "region": "KwaZulu-Natal, South Africa",
      "artist": "Traditional Zulu hymn",
      "youtubeSearch": "Igama Lakho Lindumile Zulu praise"
    },
    {
      "slug": "nkosi-yakwami",
      "title": "Nkosi Yakwami",
      "alternateTitle": "My God Reigns",
      "language": "zulu",
      "languageName": "Zulu",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1607947243050-93d773ede731?w=800&q=80",
      "excerpt": "Traditional Zulu hymn declaring God's sovereign rule over all.",
      "tags": [
        "hymn",
        "zulu",
        "traditional",
        "sovereignty"
      ],
      "region": "KwaZulu-Natal, South Africa",
      "artist": "Traditional Zulu",
      "youtubeSearch": "Nkosi Yakwami Zulu"
    },
    {
      "slug": "wona-ungabiki",
      "title": "Wona Ungcwele",
      "alternateTitle": "Holy Holy Holy",
      "language": "zulu",
      "languageName": "Zulu",
      "key": "F",
      "chords": "F - Bb - C - F",
      "image": "https://images.unsplash.com/photo-1769755410096-6c7a85d13f86?w=800&q=80",
      "excerpt": "Zulu rendition of the classic trisagion hymn of praise.",
      "tags": [
        "hymn",
        "zulu",
        "worship",
        "holy"
      ],
      "region": "Eastern Cape, South Africa",
      "artist": "Reginald Heber (Zulu translation)",
      "youtubeSearch": "Holy Holy Holy Zulu version"
    },
    {
      "slug": "qhala-umoya",
      "title": "Qhala Umoya",
      "alternateTitle": "The Spirit Descended",
      "language": "zulu",
      "languageName": "Zulu",
      "key": "D",
      "chords": "D - A - G - D",
      "image": "https://images.unsplash.com/photo-1571851636055-255e91e36c3f?w=800&q=80",
      "excerpt": "Zulu Pentecost worship song celebrating the Holy Spirit.",
      "tags": [
        "hymn",
        "zulu",
        "pentecost",
        "spirit"
      ],
      "region": "Gauteng, South Africa",
      "artist": "Zulu Pentecostal tradition",
      "youtubeSearch": "Qhala Umoya Zulu Pentecostal"
    },
    {
      "slug": "nkosi-yam",
      "title": "Nkosi Yam",
      "alternateTitle": "Lord My God",
      "language": "xhosa",
      "languageName": "Xhosa",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1607947243050-93d773ede731?w=800&q=80",
      "excerpt": "Xhosa worship song calling out to God with reverence and love.",
      "tags": [
        "hymn",
        "xhosa",
        "worship",
        "traditional"
      ],
      "region": "Eastern Cape, South Africa",
      "artist": "Traditional Xhosa",
      "youtubeSearch": "Nkosi Yam Xhosa worship"
    },
    {
      "slug": "nantsi-inkonjana",
      "title": "Nants'inkonjane",
      "alternateTitle": "There Is a Lily",
      "language": "xhosa",
      "languageName": "Xhosa",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1650658986628-1d91731f046e?w=800&q=80",
      "excerpt": "Beautiful Xhosa hymn about God's provision and care.",
      "tags": [
        "hymn",
        "xhosa",
        "traditional",
        "provision"
      ],
      "region": "Eastern Cape, South Africa",
      "artist": "Traditional Xhosa folk hymn",
      "youtubeSearch": "Nants'inkonjane Xhosa hymn"
    },
    {
      "slug": "ishe-komborhe",
      "title": "Ishe Komborhe",
      "alternateTitle": "Good Lord",
      "language": "xhosa",
      "languageName": "Xhosa",
      "key": "D",
      "chords": "D - A - G - D",
      "image": "https://images.unsplash.com/photo-1528825539566-2bcb5882445c?w=800&q=80",
      "excerpt": "Traditional Xhosa praise song of gratitude to God.",
      "tags": [
        "hymn",
        "xhosa",
        "praise",
        "gratitude"
      ],
      "region": "Eastern Cape, South Africa",
      "artist": "Traditional Xhosa",
      "youtubeSearch": "Ishe Komborhe Xhosa"
    },
    {
      "slug": "ukuhlabelwa-kwakowetu",
      "title": "Ukuhlabelwa Kwakowetu",
      "alternateTitle": "Our Song",
      "language": "xhosa",
      "languageName": "Xhosa",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1775400713633-e4b2b3577fb7?w=800&q=80",
      "excerpt": "Xhosa worship song about raising voices in praise to God.",
      "tags": [
        "hymn",
        "xhosa",
        "praise",
        "worship"
      ],
      "region": "Western Cape, South Africa",
      "artist": "Traditional Xhosa",
      "youtubeSearch": "Ukuhlabelwa Kwakowetu Xhosa"
    },
    {
      "slug": "molomo-oa-botho",
      "title": "Molomo oa Botho",
      "alternateTitle": "Word of Compassion",
      "language": "sotho",
      "languageName": "Sotho",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1739834728302-a67c905da6fb?w=800&q=80",
      "excerpt": "Sotho hymn reflecting on God's word of compassion and mercy.",
      "tags": [
        "hymn",
        "sotho",
        "meditation",
        "traditional"
      ],
      "region": "Free State, South Africa",
      "artist": "Traditional Sotho",
      "youtubeSearch": "Molomo oa Botho Sotho hymn"
    },
    {
      "slug": "ke-mo-o-lapeng",
      "title": "Ke Moo Lapeng",
      "alternateTitle": "It Is Well With My Soul",
      "language": "sotho",
      "languageName": "Sotho",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1450558415837-1f5e21a17709?w=800&q=80",
      "excerpt": "Sotho translation of the beloved hymn of peace and trust in God.",
      "tags": [
        "hymn",
        "sotho",
        "peace",
        "trust"
      ],
      "region": "Lesotho / Free State, South Africa",
      "artist": "Horatio Spafford (Sotho translation)",
      "releasedYear": 1873,
      "youtubeSearch": "It Is Well With My Soul Sotho"
    },
    {
      "slug": "thapelo-tsa-makgongwana",
      "title": "Thapelo ea Makgongwana",
      "alternateTitle": "Prayer of the Faithful",
      "language": "sotho",
      "languageName": "Sotho",
      "key": "A",
      "chords": "A - E - D - A",
      "image": "https://images.unsplash.com/photo-1775400713633-e4b2b3577fb7?w=800&q=80",
      "excerpt": "Sotho hymn of prayer and intercession for the community.",
      "tags": [
        "hymn",
        "sotho",
        "prayer",
        "intercession"
      ],
      "region": "Lesotho",
      "artist": "Traditional Sotho",
      "youtubeSearch": "Thapelo ea Makgongwana Sotho"
    },
    {
      "slug": "orahlano",
      "title": "O Rahlano",
      "alternateTitle": "You Are Our Portion",
      "language": "sotho",
      "languageName": "Sotho",
      "key": "F",
      "chords": "F - C - Bb - F",
      "image": "https://images.unsplash.com/photo-1633706719314-bd15300113cc?w=800&q=80",
      "excerpt": "Sotho worship song declaring God as our portion and inheritance.",
      "tags": [
        "hymn",
        "sotho",
        "worship",
        "inheritance"
      ],
      "region": "Lesotho",
      "artist": "Traditional Sotho",
      "youtubeSearch": "O Rahlano Sotho worship"
    },
    {
      "slug": "modimo-o-bogasi",
      "title": "Modimo o Bogasi",
      "alternateTitle": "God Is Merciful",
      "language": "tswana",
      "languageName": "Tswana",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1480721145676-f5c40929d80c?w=800&q=80",
      "excerpt": "Tswana hymn celebrating God's mercy and loving-kindness.",
      "tags": [
        "hymn",
        "tswana",
        "mercy",
        "traditional"
      ],
      "region": "North West, South Africa",
      "artist": "Traditional Tswana",
      "youtubeSearch": "Modimo o Bogasi Setswana"
    },
    {
      "slug": "thobo-ya-bonno",
      "title": "Thobo ya Bonno",
      "alternateTitle": "The Joy of Salvation",
      "language": "tswana",
      "languageName": "Tswana",
      "key": "D",
      "chords": "D - A - G - D",
      "image": "https://images.unsplash.com/photo-1766686609656-a8be9681047d?w=800&q=80",
      "excerpt": "Tswana praise song about the joy of being saved.",
      "tags": [
        "hymn",
        "tswana",
        "salvation",
        "joy"
      ],
      "region": "Botswana / North West SA",
      "artist": "Traditional Tswana",
      "youtubeSearch": "Thobo ya Bonno Setswana"
    },
    {
      "slug": "ntshitshware",
      "title": "Ntshitshware Malebana",
      "alternateTitle": "Forgive Us Our Sins",
      "language": "tswana",
      "languageName": "Tswana",
      "key": "A",
      "chords": "A - E - D - A",
      "image": "https://images.unsplash.com/photo-1739878599996-fbed899de1b0?w=800&q=80",
      "excerpt": "Tswana hymn of confession and seeking God's forgiveness.",
      "tags": [
        "hymn",
        "tswana",
        "confession",
        "forgiveness"
      ],
      "region": "Botswana",
      "artist": "Traditional Tswana",
      "youtubeSearch": "Ntshitshware Malebana Tswana"
    },
    {
      "slug": "ntlo-thaba",
      "title": "Ntlo ya Thaba",
      "alternateTitle": "House on the Rock",
      "language": "pedi",
      "languageName": "Pedi",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1637480054684-7ffd1996fc9c?w=800&q=80",
      "excerpt": "Pedi hymn based on the parable of the wise builder.",
      "tags": [
        "hymn",
        "pedi",
        "wisdom",
        "foundation"
      ],
      "region": "Limpopo, South Africa",
      "artist": "Traditional Pedi",
      "youtubeSearch": "Ntlo ya Thaba Sepedi"
    },
    {
      "slug": "moloto-wa-betha",
      "title": "Moloto wa Betha",
      "alternateTitle": "The Way of Prayer",
      "language": "pedi",
      "languageName": "Pedi",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1480721145676-f5c40929d80c?w=800&q=80",
      "excerpt": "Pedi worship song about walking in God's ways.",
      "tags": [
        "hymn",
        "pedi",
        "worship",
        "guidance"
      ],
      "region": "Limpopo, South Africa",
      "artist": "Traditional Pedi",
      "youtubeSearch": "Moloto wa Betha Sepedi"
    },
    {
      "slug": "sechaba-sa-gona",
      "title": "Sechaba sa Gona",
      "alternateTitle": "The Faithful Nation",
      "language": "pedi",
      "languageName": "Pedi",
      "key": "D",
      "chords": "D - A - G - D",
      "image": "https://images.unsplash.com/photo-1766686609656-a8be9681047d?w=800&q=80",
      "excerpt": "Pedi hymn celebrating God's chosen people.",
      "tags": [
        "hymn",
        "pedi",
        "praise",
        "chosen"
      ],
      "region": "Limpopo, South Africa",
      "artist": "Traditional Pedi",
      "youtubeSearch": "Sechaba sa Gona Sepedi"
    },
    {
      "slug": "muden-iwe",
      "title": "Mundeni Iwe",
      "alternateTitle": "Praise Him",
      "language": "ndebele",
      "languageName": "Ndebele",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1762013728522-f97f83565373?w=800&q=80",
      "excerpt": "Ndebele praise song calling all to worship God.",
      "tags": [
        "hymn",
        "ndebele",
        "praise",
        "worship"
      ],
      "region": "Mpumalanga, South Africa",
      "artist": "Traditional Ndebele",
      "youtubeSearch": "Mundeni Iwe Ndebele"
    },
    {
      "slug": "inkosi-yethu",
      "title": "INKOSI YETHU",
      "alternateTitle": "Our Lord",
      "language": "ndebele",
      "languageName": "Ndebele",
      "key": "A",
      "chords": "A - E - D - A",
      "image": "https://images.unsplash.com/photo-1571851636055-255e91e36c3f?w=800&q=80",
      "excerpt": "Ndebele hymn declaring Jesus as Lord and Savior.",
      "tags": [
        "hymn",
        "ndebele",
        "lordship",
        "salvation"
      ],
      "region": "Gauteng, South Africa",
      "artist": "Traditional Ndebele",
      "youtubeSearch": "Inkosi Yethu Ndebele worship"
    },
    {
      "slug": "lof-sy-heerlikheid",
      "title": "Lofprysing",
      "alternateTitle": "Praise His Name",
      "language": "afrikaans",
      "languageName": "Afrikaans",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1650658986628-1d91731f046e?w=800&q=80",
      "excerpt": "Traditional Afrikaans hymn of praise to God's glorious name.",
      "tags": [
        "hymn",
        "afrikaans",
        "praise",
        "traditional"
      ],
      "region": "South Africa / Afrikaans",
      "artist": "Traditional Afrikaans",
      "youtubeSearch": "Lofprysing Afrikaans hymn"
    },
    {
      "slug": "hy-is-ons-toevlug",
      "title": "Hy Is Ons Toevlug",
      "alternateTitle": "He Is Our Refuge",
      "language": "afrikaans",
      "languageName": "Afrikaans",
      "key": "D",
      "chords": "D - A - G - D",
      "image": "https://images.unsplash.com/photo-1750688468246-4679eaea864b?w=800&q=80",
      "excerpt": "Afrikaans hymn declaring God as our refuge and strength.",
      "tags": [
        "hymn",
        "afrikaans",
        "worship",
        "refuge"
      ],
      "region": "South Africa / Afrikaans",
      "artist": "Traditional Afrikaans",
      "youtubeSearch": "Hy Is Ons Toevlug Afrikaans"
    },
    {
      "slug": "gods-liefde-bly",
      "title": "God se Liefde Bly",
      "alternateTitle": "God's Love Endures",
      "language": "afrikaans",
      "languageName": "Afrikaans",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1594387295585-34ba732932c8?w=800&q=80",
      "excerpt": "Afrikaans worship song about the everlasting love of God.",
      "tags": [
        "hymn",
        "afrikaans",
        "love",
        "worship"
      ],
      "region": "South Africa / Afrikaans",
      "artist": "Traditional Afrikaans",
      "youtubeSearch": "God se Liefde Bly Afrikaans"
    },
    {
      "slug": "klim-ek-op",
      "title": "Klim Ek Op",
      "alternateTitle": "I Will Climb",
      "language": "afrikaans",
      "languageName": "Afrikaans",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1766686609656-a8be9681047d?w=800&q=80",
      "excerpt": "Afrikaans hymn about climbing to God's holy mountain.",
      "tags": [
        "hymn",
        "afrikaans",
        "worship",
        "traditional"
      ],
      "region": "South Africa / Afrikaans",
      "artist": "Traditional Afrikaans",
      "youtubeSearch": "Klim Ek Op Afrikaans"
    },
    {
      "slug": "vader-ons",
      "title": "Vader Ons",
      "alternateTitle": "Our Father",
      "language": "afrikaans",
      "languageName": "Afrikaans",
      "key": "F",
      "chords": "F - Bb - C - F",
      "image": "https://images.unsplash.com/photo-1528825539566-2bcb5882445c?w=800&q=80",
      "excerpt": "Afrikaans rendition of the Lord's Prayer in song.",
      "tags": [
        "hymn",
        "afrikaans",
        "prayer",
        "traditional"
      ],
      "region": "South Africa / Afrikaans",
      "artist": "Traditional Afrikaans",
      "youtubeSearch": "Vader Ons Afrikaans prayer"
    },
    {
      "slug": "heer-jesu-kom",
      "title": "Heer, Jesu Kom",
      "alternateTitle": "Lord Jesus Come",
      "language": "afrikaans",
      "languageName": "Afrikaans",
      "key": "G",
      "chords": "G - D - C - G",
      "image": "https://images.unsplash.com/photo-1739834728302-a67c905da6fb?w=800&q=80",
      "excerpt": "Afrikaans hymn calling for Jesus's soon return.",
      "tags": [
        "hymn",
        "afrikaans",
        "worship",
        "return"
      ],
      "region": "South Africa / Afrikaans",
      "artist": "Traditional Afrikaans",
      "youtubeSearch": "Heer Jesu Kom Afrikaans"
    },
    {
      "slug": "almal-sal-sien",
      "title": "Almal Sal Sien",
      "alternateTitle": "All Will See",
      "language": "afrikaans",
      "languageName": "Afrikaans",
      "key": "D",
      "chords": "D - A - Bm - G",
      "image": "https://images.unsplash.com/photo-1637480054684-7ffd1996fc9c?w=800&q=80",
      "excerpt": "Afrikaans hymn about the day when all will see God's glory.",
      "tags": [
        "hymn",
        "afrikaans",
        "glory",
        "worship"
      ],
      "region": "South Africa / Afrikaans",
      "artist": "Traditional Afrikaans",
      "youtubeSearch": "Almal Sal Sien Afrikaans"
    },
    {
      "slug": "jou-hand-vas",
      "title": "Jou Hand Vas",
      "alternateTitle": "Holding Your Hand",
      "language": "afrikaans",
      "languageName": "Afrikaans",
      "key": "A",
      "chords": "A - E - D - A",
      "image": "https://images.unsplash.com/photo-1528825539566-2bcb5882445c?w=800&q=80",
      "excerpt": "Afrikaans song about walking with God and holding His hand.",
      "tags": [
        "hymn",
        "afrikaans",
        "comfort",
        "worship"
      ],
      "region": "South Africa / Afrikaans",
      "artist": "Traditional Afrikaans",
      "youtubeSearch": "Jou Hand Vas Afrikaans"
    },
    {
      "slug": "mungu-ni-pema",
      "title": "Mungu Ni Pema",
      "alternateTitle": "God Is Love",
      "language": "swahili",
      "languageName": "Swahili",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1762013728522-f97f83565373?w=800&q=80",
      "excerpt": "Swahili hymn celebrating God's unfailing love.",
      "tags": [
        "hymn",
        "swahili",
        "love",
        "praise"
      ],
      "region": "East Africa / Kenya",
      "artist": "Traditional Swahili",
      "youtubeSearch": "Mungu Ni Pema Swahili"
    },
    {
      "slug": "haleluya-kristu",
      "title": "Haleluya Kristu",
      "alternateTitle": "Hallelujah Christ",
      "language": "swahili",
      "languageName": "Swahili",
      "key": "D",
      "chords": "D - A - G - D",
      "image": "https://images.unsplash.com/photo-1480721145676-f5c40929d80c?w=800&q=80",
      "excerpt": "Swahili praise song to Christ, the King of Kings.",
      "tags": [
        "hymn",
        "swahili",
        "praise",
        "contemporary"
      ],
      "region": "Tanzania / Kenya",
      "artist": "Traditional Swahili",
      "youtubeSearch": "Haleluya Kristu Swahili"
    },
    {
      "slug": "bwana-ni-rafiki",
      "title": "Bwana Ni Rafiki",
      "alternateTitle": "The Lord Is My Friend",
      "language": "swahili",
      "languageName": "Swahili",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1762013728522-f97f83565373?w=800&q=80",
      "excerpt": "Swahili hymn about God's friendship and companionship.",
      "tags": [
        "hymn",
        "swahili",
        "friendship",
        "comfort"
      ],
      "region": "Kenya",
      "artist": "Traditional Swahili",
      "youtubeSearch": "Bwana Ni Rafiki Swahili"
    },
    {
      "slug": "sabato-yake",
      "title": "Sabato Yake",
      "alternateTitle": "His Sabbath",
      "language": "swahili",
      "languageName": "Swahili",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1536063766742-b514ee70707f?w=800&q=80",
      "excerpt": "Swahili song celebrating the day of rest and worship.",
      "tags": [
        "hymn",
        "swahili",
        "sabbath",
        "worship"
      ],
      "region": "Tanzania",
      "artist": "Traditional Swahili",
      "youtubeSearch": "Sabato Yake Swahili"
    },
    {
      "slug": "yesu-kwa-magia",
      "title": "Yesu Kwa Magatia",
      "alternateTitle": "Trust in Jesus",
      "language": "swahili",
      "languageName": "Swahili",
      "key": "A",
      "chords": "A - E - D - A",
      "image": "https://images.unsplash.com/photo-1594387295585-34ba732932c8?w=800&q=80",
      "excerpt": "Swahili hymn about putting complete trust in Jesus.",
      "tags": [
        "hymn",
        "swahili",
        "trust",
        "faith"
      ],
      "region": "Uganda",
      "artist": "Traditional Swahili",
      "youtubeSearch": "Yesu Kwa Magatia Swahili"
    },
    {
      "slug": "khor-a-jesus",
      "title": "Khor a Jesus",
      "alternateTitle": "Voice of Jesus",
      "language": "dinka",
      "languageName": "Dinka",
      "key": "F",
      "chords": "F - C - Bb - F",
      "image": "https://images.unsplash.com/photo-1633706719314-bd15300113cc?w=800&q=80",
      "excerpt": "Traditional Dinka hymn praising the voice and presence of Jesus.",
      "tags": [
        "hymn",
        "dinka",
        "south-sudan",
        "traditional"
      ],
      "region": "South Sudan",
      "artist": "Traditional Dinka",
      "youtubeSearch": "Khor a Jesus Dinka hymn"
    },
    {
      "slug": "koc-na-ngun",
      "title": "Koc na Ngun",
      "alternateTitle": "God Is With Us",
      "language": "dinka",
      "languageName": "Dinka",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1450558415837-1f5e21a17709?w=800&q=80",
      "excerpt": "Dinka worship song declaring God's presence among His people.",
      "tags": [
        "hymn",
        "dinka",
        "south-sudan",
        "worship"
      ],
      "region": "South Sudan",
      "artist": "Traditional Dinka",
      "youtubeSearch": "Koc na Ngun Dinka worship"
    },
    {
      "slug": "yen-a-juk",
      "title": "Yen a Juk",
      "alternateTitle": "He Is Our King",
      "language": "dinka",
      "languageName": "Dinka",
      "key": "D",
      "chords": "D - A - G - D",
      "image": "https://images.unsplash.com/photo-1769755410096-6c7a85d13f86?w=800&q=80",
      "excerpt": "Dinka praise song declaring Christ as King over all.",
      "tags": [
        "hymn",
        "dinka",
        "praise",
        "king"
      ],
      "region": "South Sudan",
      "artist": "Traditional Dinka",
      "youtubeSearch": "Yen a Juk Dinka"
    },
    {
      "slug": "ngathok-aya",
      "title": "Ngathok Aya",
      "alternateTitle": "We Thank You",
      "language": "dinka",
      "languageName": "Dinka",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1617099331324-5ff9fb59578c?w=800&q=80",
      "excerpt": "Dinka hymn of gratitude and thanksgiving to God.",
      "tags": [
        "hymn",
        "dinka",
        "thanksgiving",
        "gratitude"
      ],
      "region": "South Sudan",
      "artist": "Traditional Dinka",
      "youtubeSearch": "Ngathok Aya Dinka"
    },
    {
      "slug": "mambo-vese-rinoita",
      "title": "Mambo Vese Rinoita",
      "alternateTitle": "All Power Belongs to God",
      "language": "shona",
      "languageName": "Shona",
      "key": "D",
      "chords": "D - G - A - D",
      "image": "https://images.unsplash.com/photo-1571851636055-255e91e36c3f?w=800&q=80",
      "excerpt": "Shona praise declaring God's supreme power and authority.",
      "tags": [
        "hymn",
        "shona",
        "zimbabwe",
        "praise"
      ],
      "region": "Zimbabwe",
      "artist": "Traditional Shona",
      "youtubeSearch": "Mambo Vese Rinoita Shona"
    },
    {
      "slug": "jesu-ndinamatee",
      "title": "Jesu NdinoMutee",
      "alternateTitle": "I Surrender All",
      "language": "shona",
      "languageName": "Shona",
      "key": "A",
      "chords": "A - E - D - A",
      "image": "https://images.unsplash.com/photo-1571851636055-255e91e36c3f?w=800&q=80",
      "excerpt": "Shona hymn of surrender and devotion to Jesus Christ.",
      "tags": [
        "hymn",
        "shona",
        "zimbabwe",
        "surrender"
      ],
      "region": "Zimbabwe",
      "artist": "Traditional Shona",
      "youtubeSearch": "Jesu NdinoMutee Shona"
    },
    {
      "slug": "vatete-vedu",
      "title": "Vatete Vedu",
      "alternateTitle": "Our Ancestors",
      "language": "shona",
      "languageName": "Shona",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1450558415837-1f5e21a17709?w=800&q=80",
      "excerpt": "Shona hymn connecting faith heritage with present worship.",
      "tags": [
        "hymn",
        "shona",
        "zimbabwe",
        "heritage"
      ],
      "region": "Zimbabwe",
      "artist": "Traditional Shona",
      "youtubeSearch": "Vatete Vedu Shona"
    },
    {
      "slug": "hymn-zvishana",
      "title": "Hymn Yezvishana",
      "alternateTitle": "Morning Hymn",
      "language": "shona",
      "languageName": "Shona",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1571851636055-255e91e36c3f?w=800&q=80",
      "excerpt": "Shona morning worship song greeting the new day with God.",
      "tags": [
        "hymn",
        "shona",
        "morning",
        "worship"
      ],
      "region": "Zimbabwe",
      "artist": "Traditional Shona",
      "youtubeSearch": "Hymn Yezvishana Shona morning"
    },
    {
      "slug": "nkolo-a-yesu",
      "title": "Nkolo a Yesu",
      "alternateTitle": "Lord Jesus",
      "language": "lingala",
      "languageName": "Lingala",
      "key": "D",
      "chords": "D - A - G - D",
      "image": "https://images.unsplash.com/photo-1536063766742-b514ee70707f?w=800&q=80",
      "excerpt": "Lingala worship song praising the name of Jesus Christ.",
      "tags": [
        "hymn",
        "lingala",
        "drc",
        "worship"
      ],
      "region": "Democratic Republic of Congo",
      "artist": "Traditional Lingala",
      "youtubeSearch": "Nkolo a Yesu Lingala"
    },
    {
      "slug": "mokonzi-wa-bato",
      "title": "Mokonzi wa Bato",
      "alternateTitle": "King of Kings",
      "language": "lingala",
      "languageName": "Lingala",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1762013728522-f97f83565373?w=800&q=80",
      "excerpt": "Lingala hymn declaring Christ as King of all nations.",
      "tags": [
        "hymn",
        "lingala",
        "praise",
        "king"
      ],
      "region": "DRC / Congo",
      "artist": "Traditional Lingala",
      "youtubeSearch": "Mokonzi wa Bato Lingala"
    },
    {
      "slug": "likambo",
      "title": "Likambo",
      "alternateTitle": "The Miracle",
      "language": "lingala",
      "languageName": "Lingala",
      "key": "A",
      "chords": "A - E - D - A",
      "image": "https://images.unsplash.com/photo-1480721145676-f5c40929d80c?w=800&q=80",
      "excerpt": "Lingala song celebrating God's miracles and wonders.",
      "tags": [
        "hymn",
        "lingala",
        "miracle",
        "praise"
      ],
      "region": "Republic of Congo",
      "artist": "Traditional Lingala",
      "youtubeSearch": "Likambo Lingala miracle"
    },
    {
      "slug": "chinedum-gi",
      "title": "Chinedum Gi",
      "alternateTitle": "Your Goodness",
      "language": "igbo",
      "languageName": "Igbo",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1617099331324-5ff9fb59578c?w=800&q=80",
      "excerpt": "Igbo hymn celebrating the goodness and mercies of God.",
      "tags": [
        "hymn",
        "igbo",
        "nigeria",
        "mercy"
      ],
      "region": "Nigeria",
      "artist": "Traditional Igbo",
      "youtubeSearch": "Chinedum Gi Igbo worship"
    },
    {
      "slug": "onye-nwe-yo",
      "title": "Onye Nwe Yo",
      "alternateTitle": "God Alone",
      "language": "igbo",
      "languageName": "Igbo",
      "key": "D",
      "chords": "D - A - G - D",
      "image": "https://images.unsplash.com/photo-1739878599996-fbed899de1b0?w=800&q=80",
      "excerpt": "Igbo worship song declaring God's sovereignty and uniqueness.",
      "tags": [
        "hymn",
        "igbo",
        "nigeria",
        "sovereignty"
      ],
      "region": "Nigeria",
      "artist": "Traditional Igbo",
      "youtubeSearch": "Onye Nwe Yo Igbo"
    },
    {
      "slug": "imela-maka",
      "title": "ImelaMaka",
      "alternateTitle": "Thank You Lord",
      "language": "igbo",
      "languageName": "Igbo",
      "key": "A",
      "chords": "A - E - D - A",
      "image": "https://images.unsplash.com/photo-1617099331324-5ff9fb59578c?w=800&q=80",
      "excerpt": "Igbo thanksgiving hymn expressing gratitude to God.",
      "tags": [
        "hymn",
        "igbo",
        "thanksgiving",
        "nigeria"
      ],
      "region": "Nigeria",
      "artist": "Traditional Igbo",
      "youtubeSearch": "Imela Maka Igbo"
    },
    {
      "slug": "olorun-wole",
      "title": "Olorun Wo Le",
      "alternateTitle": "God Is Able",
      "language": "yoruba",
      "languageName": "Yoruba",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1528825539566-2bcb5882445c?w=800&q=80",
      "excerpt": "Yoruba hymn declaring God's infinite ability and power.",
      "tags": [
        "hymn",
        "yoruba",
        "nigeria",
        "power"
      ],
      "region": "Nigeria",
      "artist": "Traditional Yoruba",
      "youtubeSearch": "Olorun Wo Le Yoruba"
    },
    {
      "slug": "alabukun",
      "title": "Alabukun",
      "alternateTitle": "The One Who Blots Out Sin",
      "language": "yoruba",
      "languageName": "Yoruba",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1450558415837-1f5e21a17709?w=800&q=80",
      "excerpt": "Yoruba hymn about God's forgiveness and redemption.",
      "tags": [
        "hymn",
        "yoruba",
        "forgiveness",
        "nigeria"
      ],
      "region": "Nigeria",
      "artist": "Traditional Yoruba",
      "youtubeSearch": "Alabukun Yoruba hymn"
    },
    {
      "slug": "orukun",
      "title": "Oru Kun",
      "alternateTitle": "Night of Joy",
      "language": "yoruba",
      "languageName": "Yoruba",
      "key": "D",
      "chords": "D - A - G - D",
      "image": "https://images.unsplash.com/photo-1607947243050-93d773ede731?w=800&q=80",
      "excerpt": "Yoruba celebration song for answered prayers.",
      "tags": [
        "hymn",
        "yoruba",
        "celebration",
        "nigeria"
      ],
      "region": "Nigeria",
      "artist": "Traditional Yoruba",
      "youtubeSearch": "Oru Kun Yoruba celebration"
    },
    {
      "slug": "mela-new",
      "title": "Mela New",
      "alternateTitle": "Our King",
      "language": "amharic",
      "languageName": "Amharic",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1739878599996-fbed899de1b0?w=800&q=80",
      "excerpt": "Amharic Orthodox hymn celebrating Christ as King.",
      "tags": [
        "hymn",
        "amharic",
        "ethiopia",
        "orthodox"
      ],
      "region": "Ethiopia",
      "artist": "Ethiopian Orthodox tradition",
      "youtubeSearch": "Mela New Amharic Orthodox"
    },
    {
      "slug": "yene-yene",
      "title": "Yene Yene",
      "alternateTitle": "My Hope",
      "language": "amharic",
      "languageName": "Amharic",
      "key": "A",
      "chords": "A - E - D - A",
      "image": "https://images.unsplash.com/photo-1571851636055-255e91e36c3f?w=800&q=80",
      "excerpt": "Amharic hymn of hope and trust in God's promises.",
      "tags": [
        "hymn",
        "amharic",
        "ethiopia",
        "hope"
      ],
      "region": "Ethiopia",
      "artist": "Traditional Amharic",
      "youtubeSearch": "Yene Yene Amharic worship"
    },
    {
      "slug": "hannam-e-seonta",
      "title": "하나님 앞에 선탄",
      "alternateTitle": "Standing Before God",
      "language": "korean",
      "languageName": "Korean",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1528825539566-2bcb5882445c?w=800&q=80",
      "excerpt": "Korean hymn about standing in the presence of Almighty God.",
      "tags": [
        "hymn",
        "korean",
        "worship",
        "traditional"
      ],
      "region": "Korea / Johannesburg Korean Community",
      "artist": "Traditional Korean hymn",
      "youtubeSearch": "하나님 앞에 서면 Korean hymn"
    },
    {
      "slug": "jeosu-chamsong",
      "title": "예수님 참사랑",
      "alternateTitle": "Jesus True Love",
      "language": "korean",
      "languageName": "Korean",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1617610882105-71c5d7447837?w=800&q=80",
      "excerpt": "Korean hymn celebrating the true love of Jesus Christ.",
      "tags": [
        "hymn",
        "korean",
        "love",
        "contemporary"
      ],
      "region": "Korea",
      "artist": "Traditional Korean",
      "youtubeSearch": "예수님 참사랑 Korean hymn"
    },
    {
      "slug": "sangnae-pil-liwo",
      "title": "생명 안에 필数的",
      "alternateTitle": "Light in the Darkness",
      "language": "korean",
      "languageName": "Korean",
      "key": "D",
      "chords": "D - A - G - D",
      "image": "https://images.unsplash.com/photo-1750688468246-4679eaea864b?w=800&q=80",
      "excerpt": "Korean hymn about God being light in our darkness.",
      "tags": [
        "hymn",
        "korean",
        "light",
        "comfort"
      ],
      "region": "Korea",
      "artist": "Traditional Korean",
      "youtubeSearch": "생명의 빛 Korean hymn light"
    },
    {
      "slug": "nallimyeo",
      "title": "날찌며 버디는 사랑",
      "alternateTitle": "Love That Never Ends",
      "language": "korean",
      "languageName": "Korean",
      "key": "A",
      "chords": "A - E - D - A",
      "image": "https://images.unsplash.com/photo-1571851636055-255e91e36c3f?w=800&q=80",
      "excerpt": "Korean hymn about God's everlasting love for us.",
      "tags": [
        "hymn",
        "korean",
        "love",
        "eternal"
      ],
      "region": "Korea",
      "artist": "Traditional Korean",
      "youtubeSearch": "끝없는 사랑 Korean hymn love",
      "popularity": "YouTube · Instagram Reels"
    },
    {
      "slug": "myeongam-eseo",
      "title": "명암에서 (In the Light)",
      "alternateTitle": "What A Beautiful Name (Korean)",
      "language": "korean",
      "languageName": "Korean",
      "key": "D",
      "chords": "D - A - Bm - G",
      "image": "https://images.unsplash.com/photo-1650658986628-1d91731f046e?w=800&q=80",
      "excerpt": "Korean worship cover of Hillsong's beloved \"What A Beautiful Name\" — a worldwide viral worship track.",
      "tags": [
        "hymn",
        "korean",
        "worship",
        "contemporary",
        "popular"
      ],
      "region": "Seoul, Korea",
      "artist": "Hillsong Worship (Korean cover)",
      "releasedYear": 2016,
      "youtubeId": "ntvJArCY7EA",
      "youtubeSearch": "What A Beautiful Name Korean",
      "popularity": "YouTube viral · 100M+ streams globally"
    },
    {
      "slug": "eunhye-ga-on-dong-an",
      "title": "은혜가 온 동안 (Grace Upon Grace)",
      "alternateTitle": "Amazing Grace (My Chains Are Gone) Korean",
      "language": "korean",
      "languageName": "Korean",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1766686609656-a8be9681047d?w=800&q=80",
      "excerpt": "Beautiful Korean rendition of the global Chris Tomlin classic. Streams widely on YouTube worship channels.",
      "tags": [
        "hymn",
        "korean",
        "grace",
        "contemporary",
        "popular"
      ],
      "region": "Korea",
      "artist": "Chris Tomlin (Korean version)",
      "releasedYear": 2006,
      "youtubeId": "CDdvReNKKUk",
      "youtubeSearch": "Amazing Grace My Chains Are Gone Korean",
      "popularity": "YouTube · Instagram worship clips",
      "lyrics": "Amazing grace, how sweet the sound\nThat saved a wretch like me\nI once was lost, but now I'm found\nWas blind, but now I see\n\nMy chains are gone, I've been set free\nMy God, my Savior has ransomed me\nAnd like a flood His mercy rains\nUnending love, amazing grace\n\nThe Lord has promised good to me\nHis word my hope secures\nHe will my shield and portion be\nAs long as life endures\n\nMy chains are gone, I've been set free\nMy God, my Savior has ransomed me\nAnd like a flood His mercy rains\nUnending love, amazing grace\n\nThe earth shall soon dissolve like snow\nThe sun forbear to shine\nBut God, who called me here below\nWill be forever mine\nWill be forever mine\nYou are forever mine"
    },
    {
      "slug": "juui-eui-salam",
      "title": "주의의 살림 (The Lord's Family)",
      "alternateTitle": "Good Good Father Korean",
      "language": "korean",
      "languageName": "Korean",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1650658986628-1d91731f046e?w=800&q=80",
      "excerpt": "Korean version of Chris Tomlin's \"Good Good Father\" — a worldwide worship favourite.",
      "tags": [
        "hymn",
        "korean",
        "father",
        "worship",
        "popular"
      ],
      "region": "Korea / Johannesburg Korean Community",
      "artist": "Chris Tomlin (Korean version)",
      "releasedYear": 2014,
      "youtubeId": "C0q3KsyDpnY",
      "youtubeSearch": "Good Good Father Korean",
      "popularity": "YouTube cover · TikTok worship"
    },
    {
      "slug": "huimang-i-manna",
      "title": "희망이 만나 (Hope Has Come)",
      "alternateTitle": "O Holy Night Korean",
      "language": "korean",
      "languageName": "Korean",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1769755410096-6c7a85d13f86?w=800&q=80",
      "excerpt": "Korean Christmas worship song — hugely popular on YouTube and Instagram during the holidays.",
      "tags": [
        "hymn",
        "korean",
        "christmas",
        "hope",
        "popular"
      ],
      "region": "Korea",
      "artist": "Adolphe Adam (Korean version)",
      "releasedYear": 1847,
      "youtubeId": "nwzlGFSIQck",
      "youtubeSearch": "O Holy Night Korean",
      "popularity": "YouTube Christmas viral · Spotify holiday top 100"
    },
    {
      "slug": "modeun-nal",
      "title": "모든 날 (Every Day)",
      "alternateTitle": "10,000 Reasons (Bless the Lord) Korean",
      "language": "korean",
      "languageName": "Korean",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1637480054684-7ffd1996fc9c?w=800&q=80",
      "excerpt": "Korean translation of Matt Redman's \"10,000 Reasons\" — one of the most-streamed worship songs of the decade.",
      "tags": [
        "hymn",
        "korean",
        "praise",
        "contemporary",
        "popular"
      ],
      "region": "Korea",
      "artist": "Matt Redman (Korean version)",
      "releasedYear": 2011,
      "youtubeId": "XtwIT8Bvqgg",
      "youtubeSearch": "10000 Reasons Korean 만복의 하나님",
      "popularity": "YouTube 500M+ views globally",
      "lyrics": "Bless the Lord, O my soul\nO my soul, worship His holy name\nSing like never before, O my soul\nI'll worship Your holy name\n\nThe sun comes up, it's a new day dawning\nIt's time to sing Your song again\nWhatever may pass and whatever lies before me\nLet me be singing when the evening comes\n\nBless the Lord, O my soul\nO my soul, worship His holy name\nSing like never before, O my soul\nI'll worship Your holy name\n\nYou're rich in love and You're slow to anger\nYour name is great and Your heart is kind\nFor all Your goodness, I will keep on singing\nTen thousand reasons for my heart to find\n\nBless the Lord, O my soul\nO my soul, worship His holy name\nSing like never before, O my soul\nI'll worship Your holy name\n\nAnd on that day when my strength is failing\nThe end draws near and my time has come\nStill my soul will sing Your praise unending\nTen thousand years and then forevermore\n\nBless the Lord, O my soul\nO my soul, worship His holy name\nSing like never before, O my soul\nI'll worship Your holy name"
    },
    {
      "slug": "what-a-beautiful-name",
      "title": "What A Beautiful Name",
      "alternateTitle": "Hillsong Worship",
      "language": "english",
      "languageName": "English",
      "key": "D",
      "chords": "D - A - Bm - G",
      "image": "https://images.unsplash.com/photo-1450558415837-1f5e21a17709?w=800&q=80",
      "excerpt": "Hillsong Worship's global anthem — one of the most-streamed worship songs of the 2010s.",
      "tags": [
        "hymn",
        "english",
        "contemporary",
        "popular",
        "hillsong"
      ],
      "region": "Australia / Global",
      "artist": "Hillsong Worship",
      "releasedYear": 2016,
      "youtubeId": "ntvJArCY7EA",
      "youtubeSearch": "What A Beautiful Name Hillsong",
      "popularity": "YouTube 2B+ views · Spotify 1B+ streams",
      "lyrics": "You were the Word at the beginning\nOne with God the Lord Most High\nYour hidden glory in creation\nNow revealed in You our Christ\n\nChorus\nWhat a beautiful Name it is\nWhat a beautiful Name it is\nThe Name of Jesus Christ my King\nWhat a beautiful Name it is\nNothing compares to this\nWhat a beautiful Name it is\nThe Name of Jesus\n\nYou didn't want heaven without us\nSo Jesus You brought heaven down\nMy sin was great Your love was greater\nWhat could separate us now\n\nChorus\n\nDeath could not hold You\nThe veil tore before You\nYou silence the boast of sin and grave\nThe heavens are roaring\nThe praise of Your glory\nFor You are raised to life again\n\nChorus\n\nWhat a beautiful Name it is\nWhat a beautiful Name it is\nThe Name of Jesus Christ my King\nWhat a beautiful Name it is\nNothing compares to this\nWhat a beautiful Name it is\nThe Name of Jesus\nThe Name of Jesus"
    },
    {
      "slug": "good-good-father",
      "title": "Good Good Father",
      "alternateTitle": "Chris Tomlin",
      "language": "english",
      "languageName": "English",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1536063766742-b514ee70707f?w=800&q=80",
      "excerpt": "Chris Tomlin's heartfelt worship song about the Father's perfect love. A modern church favourite.",
      "tags": [
        "hymn",
        "english",
        "father",
        "worship",
        "popular"
      ],
      "region": "USA / Global",
      "artist": "Chris Tomlin",
      "releasedYear": 2014,
      "youtubeId": "C0q3KsyDpnY",
      "youtubeSearch": "Good Good Father Chris Tomlin",
      "popularity": "YouTube 600M+ views · CCLI Top 10",
      "lyrics": "I've heard a thousand stories of what they think You're like\nBut I've heard the tender whisper of love in the dead of night\nYou tell me that You're pleased and that I'm never alone\n\nChorus\nYou're a good, good Father\nIt's who You are, it's who You are, it's who You are\nAnd I'm loved by You\nIt's who I am, it's who I am, it's who I am\n\nI've seen many searching for answers far and wide\nBut I know we're all searching for answers only You provide\nBecause You know just what we need before we say a word\n\nChorus\n\nYou are perfect in all of Your ways\nYou are perfect in all of Your ways\nYou are perfect in all of Your ways to us\n\nOh, it's love so undeniable\nI, I can hardly speak\nPeace so unexplainable\nI, I can hardly think\n\nAs You call me deeper still\nAs You call me deeper still\nAs You call me deeper still\nInto love, love, love\n\nChorus\n\nYou're a good, good Father\nIt's who You are, it's who You are, it's who You are\nAnd I'm loved by You"
    },
    {
      "slug": "10000-reasons",
      "title": "10,000 Reasons (Bless the Lord)",
      "alternateTitle": "Matt Redman",
      "language": "english",
      "languageName": "English",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1536063766742-b514ee70707f?w=800&q=80",
      "excerpt": "Matt Redman's Grammy-winning worship anthem. Sung in churches worldwide every Sunday.",
      "tags": [
        "hymn",
        "english",
        "praise",
        "contemporary",
        "popular"
      ],
      "region": "UK / Global",
      "artist": "Matt Redman",
      "releasedYear": 2011,
      "youtubeId": "XtwIT8Bvqgg",
      "youtubeSearch": "10000 Reasons Matt Redman",
      "popularity": "YouTube 700M+ views · Billboard Christian #1"
    },
    {
      "slug": "way-maker",
      "title": "Way Maker",
      "alternateTitle": "Sinach (Sinach Joseph)",
      "language": "english",
      "languageName": "English",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1769755410096-6c7a85d13f86?w=800&q=80",
      "excerpt": "Sinach's global worship phenomenon — originated in Nigeria and became a worldwide Pentecostal anthem.",
      "tags": [
        "hymn",
        "english",
        "pentecost",
        "worship",
        "popular",
        "nigerian"
      ],
      "region": "Nigeria / Global",
      "artist": "Sinach",
      "releasedYear": 2015,
      "youtubeId": "iJ5SEz5Ez0Q",
      "youtubeSearch": "Way Maker Sinach official",
      "popularity": "YouTube 500M+ views · Spotify 1B+ streams",
      "lyrics": "Way maker, miracle worker, promise keeper, light in the darkness\nMy God, that is who You are\n\nWay maker, miracle worker, promise keeper, light in the darkness\nMy God, that is who You are\n\nYou are here, working in this place\nI believe, I believe\nYou are here, moving in our midst\nI believe, I believe\nYou are here, working in this place\nI believe, I believe\nYou are here, moving in our midst\nI believe, I believe\n\nWay maker, miracle worker, promise keeper, light in the darkness\nMy God, that is who You are\n\nYou are here, touching every heart\nI believe, I believe\nYou are here, healing every heart\nI believe, I believe\nYou are here, turning lives around\nI believe, I believe\nYou are here, mending every heart\nI believe, I believe\n\nWay maker, miracle worker, promise keeper, light in the darkness\nMy God, that is who You are\n\nSing it out\nWay maker, miracle worker, promise keeper, light in the darkness\nMy God, that is who You are\nYeah, that is who You are\n\nEven when I don't see it, You're working\nEven when I don't feel it, You're working\nYou never stop, You never stop working\nYou never stop, You never stop working"
    },
    {
      "slug": "oceans-hillsong",
      "title": "Oceans (Where Feet May Be)",
      "alternateTitle": "Hillsong United",
      "language": "english",
      "languageName": "English",
      "key": "D",
      "chords": "D - A - Bm - G",
      "image": "https://images.unsplash.com/photo-1617610882105-71c5d7447837?w=800&q=80",
      "excerpt": "Hillsong United's iconic anthem of faith and trust — sung at youth conferences worldwide.",
      "tags": [
        "hymn",
        "english",
        "faith",
        "contemporary",
        "popular"
      ],
      "region": "Australia / Global",
      "artist": "Hillsong United",
      "releasedYear": 2013,
      "youtubeId": "dy9nwe9_cz0",
      "youtubeSearch": "Oceans Hillsong United",
      "popularity": "YouTube 800M+ views · youth conference staple"
    },
    {
      "slug": "how-great-is-our-god",
      "title": "How Great Is Our God",
      "alternateTitle": "Chris Tomlin",
      "language": "english",
      "languageName": "English",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1775400713633-e4b2b3577fb7?w=800&q=80",
      "excerpt": "Chris Tomlin's worldwide worship anthem. Translated into 60+ languages including Zulu, Xhosa, and Afrikaans.",
      "tags": [
        "hymn",
        "english",
        "praise",
        "contemporary",
        "popular"
      ],
      "region": "USA / Global",
      "artist": "Chris Tomlin",
      "releasedYear": 2004,
      "youtubeId": "9VX9_M3YYz4",
      "youtubeSearch": "How Great Is Our God Chris Tomlin",
      "popularity": "YouTube 1B+ views · most-translated worship song"
    },
    {
      "slug": "reckless-love",
      "title": "Reckless Love",
      "alternateTitle": "Cory Asbury",
      "language": "english",
      "languageName": "English",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1571851636055-255e91e36c3f?w=800&q=80",
      "excerpt": "Cory Asbury's stirring declaration of God's relentless love. A modern worship classic.",
      "tags": [
        "hymn",
        "english",
        "love",
        "contemporary",
        "popular"
      ],
      "region": "USA / Global",
      "artist": "Cory Asbury",
      "releasedYear": 2017,
      "youtubeId": "Sc6SSHuCV7E",
      "youtubeSearch": "Reckless Love Cory Asbury",
      "popularity": "YouTube 350M+ views · Spotify 500M+ streams"
    },
    {
      "slug": "build-my-life",
      "title": "Build My Life",
      "alternateTitle": "Housefires / Brett Younker",
      "language": "english",
      "languageName": "English",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1617610882105-71c5d7447837?w=800&q=80",
      "excerpt": "Worship song widely sung in churches from South Africa to the USA. Beautiful declaration of devotion.",
      "tags": [
        "hymn",
        "english",
        "devotion",
        "worship",
        "popular"
      ],
      "region": "USA / Global",
      "artist": "Housefires",
      "releasedYear": 2015,
      "youtubeId": "wjkjBgrL3II",
      "youtubeSearch": "Build My Life Housefires",
      "popularity": "YouTube 200M+ views · church staple"
    },
    {
      "slug": "nana-makhosi",
      "title": "Nana Makhosi (Come Lord)",
      "alternateTitle": "Come Lord Jesus",
      "language": "zulu",
      "languageName": "Zulu",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1528825539566-2bcb5882445c?w=800&q=80",
      "excerpt": "Zulu worship song calling for the Lord's return. Sung widely at South African prayer gatherings.",
      "tags": [
        "hymn",
        "zulu",
        "worship",
        "return",
        "popular"
      ],
      "region": "KwaZulu-Natal, South Africa",
      "artist": "Contemporary Zulu",
      "youtubeSearch": "Nana Makhosi Zulu worship",
      "popularity": "YouTube SA gospel · TikTok worship clips"
    },
    {
      "slug": "siyakudumisa",
      "title": "Siyakudumisa (We Praise You)",
      "alternateTitle": "Way Maker Zulu",
      "language": "zulu",
      "languageName": "Zulu",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1571851636055-255e91e36c3f?w=800&q=80",
      "excerpt": "Zulu rendition of Sinach's global \"Way Maker\". Streams millions of times across South African gospel channels.",
      "tags": [
        "hymn",
        "zulu",
        "worship",
        "praise",
        "popular"
      ],
      "region": "KwaZulu-Natal, South Africa",
      "artist": "Sinach (Zulu translation)",
      "releasedYear": 2015,
      "youtubeSearch": "Siyakudumisa Way Maker Zulu",
      "popularity": "YouTube 50M+ views SA gospel"
    },
    {
      "slug": "u-jehova-ungubaba",
      "title": "U-Jehova Ungubaba",
      "alternateTitle": "Good Good Father Zulu",
      "language": "zulu",
      "languageName": "Zulu",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1762013728522-f97f83565373?w=800&q=80",
      "excerpt": "Zulu version of \"Good Good Father\" — popular across SA churches and TikTok worship trends.",
      "tags": [
        "hymn",
        "zulu",
        "father",
        "worship",
        "popular"
      ],
      "region": "Gauteng, South Africa",
      "artist": "Chris Tomlin (Zulu version)",
      "releasedYear": 2014,
      "youtubeSearch": "UJehova Ungubaba Zulu Good Good Father",
      "popularity": "YouTube worship covers · Instagram Reels"
    },
    {
      "slug": "imina-yami",
      "title": "Imina Yami (My Everything)",
      "alternateTitle": "10,000 Reasons Zulu",
      "language": "zulu",
      "languageName": "Zulu",
      "key": "D",
      "chords": "D - A - G - D",
      "image": "https://images.unsplash.com/photo-1480721145676-f5c40929d80c?w=800&q=80",
      "excerpt": "Zulu translation of \"10,000 Reasons\". A Sunday service staple across South African churches.",
      "tags": [
        "hymn",
        "zulu",
        "praise",
        "worship",
        "popular"
      ],
      "region": "KwaZulu-Natal, South Africa",
      "artist": "Matt Redman (Zulu version)",
      "releasedYear": 2011,
      "youtubeSearch": "Imina Yami 10000 Reasons Zulu",
      "popularity": "YouTube gospel channels · SA radio rotation"
    },
    {
      "slug": "guqula-iintliziyo",
      "title": "Guqula Iintliziyo",
      "alternateTitle": "Way Maker Xhosa",
      "language": "xhosa",
      "languageName": "Xhosa",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1571851636055-255e91e36c3f?w=800&q=80",
      "excerpt": "Xhosa version of Sinach's \"Way Maker\" — a powerful praise anthem in Eastern Cape churches.",
      "tags": [
        "hymn",
        "xhosa",
        "praise",
        "worship",
        "popular"
      ],
      "region": "Eastern Cape, South Africa",
      "artist": "Sinach (Xhosa translation)",
      "releasedYear": 2015,
      "youtubeSearch": "Guqula Iintliziyo Way Maker Xhosa",
      "popularity": "YouTube worship channels · SA gospel radio"
    },
    {
      "slug": "baba-wethu",
      "title": "Baba Wethu (Our Father)",
      "alternateTitle": "Good Good Father Xhosa",
      "language": "xhosa",
      "languageName": "Xhosa",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1739878599996-fbed899de1b0?w=800&q=80",
      "excerpt": "Xhosa translation of \"Good Good Father\" — sung with deep emotion in Xhosa congregations.",
      "tags": [
        "hymn",
        "xhosa",
        "father",
        "worship",
        "popular"
      ],
      "region": "Eastern Cape, South Africa",
      "artist": "Chris Tomlin (Xhosa version)",
      "releasedYear": 2014,
      "youtubeSearch": "Baba Wethu Good Good Father Xhosa",
      "popularity": "YouTube gospel · TikTok Xhosa worship"
    },
    {
      "slug": "yintoni-egqwesileyo",
      "title": "Yintoni Egqwesileyo",
      "alternateTitle": "How Great Is Our God Xhosa",
      "language": "xhosa",
      "languageName": "Xhosa",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1528825539566-2bcb5882445c?w=800&q=80",
      "excerpt": "Xhosa version of \"How Great Is Our God\". A joyful praise song ringing through SA Sunday services.",
      "tags": [
        "hymn",
        "xhosa",
        "praise",
        "contemporary",
        "popular"
      ],
      "region": "Western Cape, South Africa",
      "artist": "Chris Tomlin (Xhosa version)",
      "releasedYear": 2004,
      "youtubeSearch": "Yintoni Egqwesileyo How Great Is Our God Xhosa",
      "popularity": "YouTube cover · Instagram gospel clips"
    },
    {
      "slug": "akukho-nye",
      "title": "Akukho Nye (No Other)",
      "alternateTitle": "No One Like Our God Xhosa",
      "language": "xhosa",
      "languageName": "Xhosa",
      "key": "D",
      "chords": "D - A - Bm - G",
      "image": "https://images.unsplash.com/photo-1617099331324-5ff9fb59578c?w=800&q=80",
      "excerpt": "Xhosa original worship song declaring there is no one like our God.",
      "tags": [
        "hymn",
        "xhosa",
        "praise",
        "worship",
        "contemporary"
      ],
      "region": "Eastern Cape, South Africa",
      "artist": "Contemporary Xhosa",
      "youtubeSearch": "Akukho Nye Xhosa worship",
      "popularity": "YouTube SA gospel · TikTok worship"
    },
    {
      "slug": "molimo-o-moholo",
      "title": "Molimo O Moholo",
      "alternateTitle": "How Great Is Our God Sotho",
      "language": "sotho",
      "languageName": "Sotho",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1766686609656-a8be9681047d?w=800&q=80",
      "excerpt": "Sotho rendition of \"How Great Is Our God\" — powerful in Lesotho and Free State congregations.",
      "tags": [
        "hymn",
        "sotho",
        "praise",
        "contemporary",
        "popular"
      ],
      "region": "Lesotho / Free State, South Africa",
      "artist": "Chris Tomlin (Sotho version)",
      "releasedYear": 2004,
      "youtubeSearch": "Molimo O Moholo How Great Sotho",
      "popularity": "YouTube SA gospel · Instagram"
    },
    {
      "slug": "ntate-ka-heso",
      "title": "Ntate Ka Heso",
      "alternateTitle": "Good Good Father Sotho",
      "language": "sotho",
      "languageName": "Sotho",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1480721145676-f5c40929d80c?w=800&q=80",
      "excerpt": "Sotho version of \"Good Good Father\" — sung with deep reverence in Basotho churches.",
      "tags": [
        "hymn",
        "sotho",
        "father",
        "worship",
        "popular"
      ],
      "region": "Lesotho",
      "artist": "Chris Tomlin (Sotho version)",
      "releasedYear": 2014,
      "youtubeSearch": "Ntate Ka Heso Good Good Father Sotho",
      "popularity": "YouTube worship · TikTok Sotho gospel"
    },
    {
      "slug": "moholo-le-motle",
      "title": "Moholo Le Motle",
      "alternateTitle": "Beautiful In Its Time Sotho",
      "language": "sotho",
      "languageName": "Sotho",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1480721145676-f5c40929d80c?w=800&q=80",
      "excerpt": "Sotho worship song celebrating God's perfect timing and beauty.",
      "tags": [
        "hymn",
        "sotho",
        "worship",
        "beauty",
        "traditional"
      ],
      "region": "Lesotho / Free State, South Africa",
      "artist": "Traditional Sotho",
      "youtubeSearch": "Moholo Le Motle Sotho worship",
      "popularity": "YouTube gospel · SA gospel radio"
    },
    {
      "slug": "modimo-o-mogolo",
      "title": "Modimo O Mogolo",
      "alternateTitle": "How Great Is Our God Tswana",
      "language": "tswana",
      "languageName": "Tswana",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1528825539566-2bcb5882445c?w=800&q=80",
      "excerpt": "Tswana translation of the global anthem \"How Great Is Our God\".",
      "tags": [
        "hymn",
        "tswana",
        "praise",
        "contemporary",
        "popular"
      ],
      "region": "Botswana / North West SA",
      "artist": "Chris Tomlin (Tswana version)",
      "releasedYear": 2004,
      "youtubeSearch": "Modimo O Mogolo How Great Tswana",
      "popularity": "YouTube gospel · Instagram"
    },
    {
      "slug": "rra-wa-rona",
      "title": "Rra Wa Rona",
      "alternateTitle": "Good Good Father Tswana",
      "language": "tswana",
      "languageName": "Tswana",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1594387295585-34ba732932c8?w=800&q=80",
      "excerpt": "Tswana version of \"Good Good Father\" — popular in Botswana and SA gospel circles.",
      "tags": [
        "hymn",
        "tswana",
        "father",
        "worship",
        "popular"
      ],
      "region": "Botswana",
      "artist": "Chris Tomlin (Tswana version)",
      "releasedYear": 2014,
      "youtubeSearch": "Rra Wa Rona Good Good Father Tswana",
      "popularity": "YouTube Botswana gospel · TikTok"
    },
    {
      "slug": "loago-mme",
      "title": "Loago Mme (I Rest In You)",
      "alternateTitle": "Way Maker Tswana",
      "language": "tswana",
      "languageName": "Tswana",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1617099331324-5ff9fb59578c?w=800&q=80",
      "excerpt": "Tswana rendition of \"Way Maker\" — beautiful and anointed in Setswana worship.",
      "tags": [
        "hymn",
        "tswana",
        "worship",
        "praise",
        "popular"
      ],
      "region": "Botswana / North West SA",
      "artist": "Sinach (Tswana translation)",
      "releasedYear": 2015,
      "youtubeSearch": "Loago Mme Way Maker Tswana",
      "popularity": "YouTube worship channels · SA gospel radio"
    },
    {
      "slug": "modimo-wa-mphahlwe",
      "title": "Modimo Wa Mphahlwe",
      "alternateTitle": "How Great Is Our God Pedi",
      "language": "pedi",
      "languageName": "Pedi",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1637480054684-7ffd1996fc9c?w=800&q=80",
      "excerpt": "Pedi version of \"How Great Is Our God\" — lively praise in Limpopo congregations.",
      "tags": [
        "hymn",
        "pedi",
        "praise",
        "contemporary",
        "popular"
      ],
      "region": "Limpopo, South Africa",
      "artist": "Chris Tomlin (Pedi version)",
      "releasedYear": 2004,
      "youtubeSearch": "Modimo Wa Mphahlwe How Great Pedi",
      "popularity": "YouTube SA gospel · TikTok Pedi worship"
    },
    {
      "slug": "tatago-wa-ka",
      "title": "Tatago Wa Ka",
      "alternateTitle": "Good Good Father Pedi",
      "language": "pedi",
      "languageName": "Pedi",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1480721145676-f5c40929d80c?w=800&q=80",
      "excerpt": "Pedi rendition of \"Good Good Father\" — tender and intimate in Sepedi worship.",
      "tags": [
        "hymn",
        "pedi",
        "father",
        "worship",
        "popular"
      ],
      "region": "Limpopo, South Africa",
      "artist": "Chris Tomlin (Pedi version)",
      "releasedYear": 2014,
      "youtubeSearch": "Tatago Wa Ka Good Good Father Pedi",
      "popularity": "YouTube gospel · Instagram Reels"
    },
    {
      "slug": "re-lena-le-modimo",
      "title": "Re Lena Le Modimo",
      "alternateTitle": "Way Maker Pedi",
      "language": "pedi",
      "languageName": "Pedi",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1480721145676-f5c40929d80c?w=800&q=80",
      "excerpt": "Pedi version of \"Way Maker\" — energetic Pentecostal praise from Limpopo churches.",
      "tags": [
        "hymn",
        "pedi",
        "pentecost",
        "worship",
        "popular"
      ],
      "region": "Limpopo, South Africa",
      "artist": "Sinach (Pedi translation)",
      "releasedYear": 2015,
      "youtubeSearch": "Re Lena Le Modimo Way Maker Pedi",
      "popularity": "YouTube worship · SA gospel radio"
    },
    {
      "slug": "nengiwe-tata",
      "title": "Nengiwe Tata",
      "alternateTitle": "Good Good Father Ndebele",
      "language": "ndebele",
      "languageName": "Ndebele",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1766686609656-a8be9681047d?w=800&q=80",
      "excerpt": "Ndebele version of \"Good Good Father\" — beautifully sung in Ndebele churches.",
      "tags": [
        "hymn",
        "ndebele",
        "father",
        "worship",
        "popular"
      ],
      "region": "Mpumalanga, South Africa",
      "artist": "Chris Tomlin (Ndebele version)",
      "releasedYear": 2014,
      "youtubeSearch": "Nengiwe Tata Good Good Father Ndebele",
      "popularity": "YouTube gospel channels · TikTok worship"
    },
    {
      "slug": "siyabonga-tata",
      "title": "Siyabonga Tata",
      "alternateTitle": "10,000 Reasons Ndebele",
      "language": "ndebele",
      "languageName": "Ndebele",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1528825539566-2bcb5882445c?w=800&q=80",
      "excerpt": "Ndebele worship song of gratitude. Sung in many Ndebele Sunday services.",
      "tags": [
        "hymn",
        "ndebele",
        "gratitude",
        "worship",
        "popular"
      ],
      "region": "Gauteng, South Africa",
      "artist": "Matt Redman (Ndebele version)",
      "releasedYear": 2011,
      "youtubeSearch": "Siyabonga Tata 10000 Reasons Ndebele",
      "popularity": "YouTube gospel · SA gospel radio"
    },
    {
      "slug": "hoe-groot-is-ons-god",
      "title": "Hoe Groot Is Ons God",
      "alternateTitle": "How Great Is Our God Afrikaans",
      "language": "afrikaans",
      "languageName": "Afrikaans",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1607947243050-93d773ede731?w=800&q=80",
      "excerpt": "Afrikaans version of \"How Great Is Our God\". Joyful in Afrikaans Reformed and Pentecostal churches.",
      "tags": [
        "hymn",
        "afrikaans",
        "praise",
        "contemporary",
        "popular"
      ],
      "region": "South Africa / Afrikaans",
      "artist": "Chris Tomlin (Afrikaans version)",
      "releasedYear": 2004,
      "youtubeSearch": "Hoe Groot Is Ons God Afrikaans",
      "popularity": "YouTube Afrikaans gospel · Instagram"
    },
    {
      "slug": "goeie-goeie-vader",
      "title": "Goeie Goeie Vader",
      "alternateTitle": "Good Good Father Afrikaans",
      "language": "afrikaans",
      "languageName": "Afrikaans",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1607947243050-93d773ede731?w=800&q=80",
      "excerpt": "Afrikaans rendition of \"Good Good Father\". A moving worship song in Afrikaans congregations.",
      "tags": [
        "hymn",
        "afrikaans",
        "father",
        "worship",
        "popular"
      ],
      "region": "South Africa / Afrikaans",
      "artist": "Chris Tomlin (Afrikaans version)",
      "releasedYear": 2014,
      "youtubeSearch": "Goeie Goeie Vader Good Good Father Afrikaans",
      "popularity": "YouTube worship · TikTok Afrikaans"
    },
    {
      "slug": "tien-duisend-redes",
      "title": "Tien Duisend Redes",
      "alternateTitle": "10,000 Reasons Afrikaans",
      "language": "afrikaans",
      "languageName": "Afrikaans",
      "key": "D",
      "chords": "D - A - G - D",
      "image": "https://images.unsplash.com/photo-1536063766742-b514ee70707f?w=800&q=80",
      "excerpt": "Afrikaans translation of \"10,000 Reasons\". A heartfelt praise song across SA Dutch Reformed churches.",
      "tags": [
        "hymn",
        "afrikaans",
        "praise",
        "contemporary",
        "popular"
      ],
      "region": "South Africa / Afrikaans",
      "artist": "Matt Redman (Afrikaans version)",
      "releasedYear": 2011,
      "youtubeSearch": "Tien Duisend Redes 10000 Reasons Afrikaans",
      "popularity": "YouTube gospel · SA Christian radio"
    },
    {
      "slug": "magtige-god",
      "title": "Magtige God",
      "alternateTitle": "Mighty God Afrikaans",
      "language": "afrikaans",
      "languageName": "Afrikaans",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1528825539566-2bcb5882445c?w=800&q=80",
      "excerpt": "Afrikaans worship anthem declaring God's mighty power. Popular in Afrikaans revival meetings.",
      "tags": [
        "hymn",
        "afrikaans",
        "power",
        "worship",
        "contemporary"
      ],
      "region": "South Africa / Afrikaans",
      "artist": "Contemporary Afrikaans",
      "youtubeSearch": "Magtige God Afrikaans worship",
      "popularity": "YouTube Afrikaans gospel · TikTok"
    },
    {
      "slug": "mwanga-wa-dunia",
      "title": "Mwanga Wa Dunia",
      "alternateTitle": "Way Maker Swahili",
      "language": "swahili",
      "languageName": "Swahili",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1480721145676-f5c40929d80c?w=800&q=80",
      "excerpt": "Swahili version of \"Way Maker\" — explosive praise in East African churches.",
      "tags": [
        "hymn",
        "swahili",
        "worship",
        "praise",
        "popular"
      ],
      "region": "Kenya / Tanzania",
      "artist": "Sinach (Swahili translation)",
      "releasedYear": 2015,
      "youtubeSearch": "Mwanga Wa Dunia Way Maker Swahili",
      "popularity": "YouTube gospel 30M+ views East Africa"
    },
    {
      "slug": "baba-mwema",
      "title": "Baba Mwema",
      "alternateTitle": "Good Good Father Swahili",
      "language": "swahili",
      "languageName": "Swahili",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1536063766742-b514ee70707f?w=800&q=80",
      "excerpt": "Swahili rendition of \"Good Good Father\". Popular in Kenyan and Tanzanian churches.",
      "tags": [
        "hymn",
        "swahili",
        "father",
        "worship",
        "popular"
      ],
      "region": "Kenya",
      "artist": "Chris Tomlin (Swahili version)",
      "releasedYear": 2014,
      "youtubeSearch": "Baba Mwema Good Good Father Swahili",
      "popularity": "YouTube gospel · TikTok Swahili worship"
    },
    {
      "slug": "elimu-ya-yesu",
      "title": "Elimu Ya Yesu",
      "alternateTitle": "Amazing Grace Swahili",
      "language": "swahili",
      "languageName": "Swahili",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1775400713633-e4b2b3577fb7?w=800&q=80",
      "excerpt": "Swahili version of \"Amazing Grace (My Chains Are Gone)\" — sung in churches across East Africa.",
      "tags": [
        "hymn",
        "swahili",
        "grace",
        "contemporary",
        "popular"
      ],
      "region": "Tanzania",
      "artist": "Chris Tomlin (Swahili version)",
      "releasedYear": 2006,
      "youtubeSearch": "Elimu Ya Yesu Amazing Grace Swahili",
      "popularity": "YouTube gospel · Instagram worship"
    },
    {
      "slug": "nguvu-za-mungu",
      "title": "Nguvu Za Mungu",
      "alternateTitle": "How Great Is Our God Swahili",
      "language": "swahili",
      "languageName": "Swahili",
      "key": "D",
      "chords": "D - A - Bm - G",
      "image": "https://images.unsplash.com/photo-1739878599996-fbed899de1b0?w=800&q=80",
      "excerpt": "Swahili translation of \"How Great Is Our God\" — vibrant East African praise.",
      "tags": [
        "hymn",
        "swahili",
        "praise",
        "contemporary",
        "popular"
      ],
      "region": "Kenya / Uganda",
      "artist": "Chris Tomlin (Swahili version)",
      "releasedYear": 2004,
      "youtubeSearch": "Nguvu Za Mungu How Great Swahili",
      "popularity": "YouTube gospel · TikTok East African"
    },
    {
      "slug": "kuc-piny",
      "title": "Kuc Piny (Heavenly Praise)",
      "alternateTitle": "Heavenly Praise Dinka",
      "language": "dinka",
      "languageName": "Dinka",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1762013728522-f97f83565373?w=800&q=80",
      "excerpt": "Dinka praise song sung in churches across the South Sudanese diaspora.",
      "tags": [
        "hymn",
        "dinka",
        "praise",
        "worship",
        "contemporary"
      ],
      "region": "South Sudan / Diaspora",
      "artist": "Contemporary Dinka",
      "youtubeSearch": "Kuc Piny Dinka praise",
      "popularity": "YouTube gospel · South Sudanese gospel radio"
    },
    {
      "slug": "wuoth-nhiim",
      "title": "Wuoth Nhiim",
      "alternateTitle": "Way Maker Dinka",
      "language": "dinka",
      "languageName": "Dinka",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1571851636055-255e91e36c3f?w=800&q=80",
      "excerpt": "Dinka rendition of \"Way Maker\" — beloved in South Sudanese congregations.",
      "tags": [
        "hymn",
        "dinka",
        "worship",
        "praise",
        "popular"
      ],
      "region": "South Sudan",
      "artist": "Sinach (Dinka translation)",
      "releasedYear": 2015,
      "youtubeSearch": "Wuoth Nhiim Way Maker Dinka",
      "popularity": "YouTube gospel · South Sudanese diaspora"
    },
    {
      "slug": "tinashe-madzibaba",
      "title": "Tinashe Madzibaba",
      "alternateTitle": "Way Maker Shona",
      "language": "shona",
      "languageName": "Shona",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1607947243050-93d773ede731?w=800&q=80",
      "excerpt": "Shona version of \"Way Maker\" — Zimbabwe's beloved worship anthem.",
      "tags": [
        "hymn",
        "shona",
        "worship",
        "praise",
        "popular"
      ],
      "region": "Zimbabwe",
      "artist": "Sinach (Shona translation)",
      "releasedYear": 2015,
      "youtubeSearch": "Tinashe Madzibaba Way Maker Shona",
      "popularity": "YouTube Zim gospel 20M+ views"
    },
    {
      "slug": "baba-vakanaka",
      "title": "Baba Vakanaka",
      "alternateTitle": "Good Good Father Shona",
      "language": "shona",
      "languageName": "Shona",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1571851636055-255e91e36c3f?w=800&q=80",
      "excerpt": "Shona rendition of \"Good Good Father\". A favourite in Zimbabwe's Apostolic and Pentecostal churches.",
      "tags": [
        "hymn",
        "shona",
        "father",
        "worship",
        "popular"
      ],
      "region": "Zimbabwe",
      "artist": "Chris Tomlin (Shona version)",
      "releasedYear": 2014,
      "youtubeSearch": "Baba Vakanaka Good Good Father Shona",
      "popularity": "YouTube gospel · TikTok Zimbabwe"
    },
    {
      "slug": "ruware-rukuru",
      "title": "Ruware Rukuru",
      "alternateTitle": "10,000 Reasons Shona",
      "language": "shona",
      "languageName": "Shona",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1617610882105-71c5d7447837?w=800&q=80",
      "excerpt": "Shona translation of \"10,000 Reasons\". A joyful Shona worship song.",
      "tags": [
        "hymn",
        "shona",
        "praise",
        "worship",
        "popular"
      ],
      "region": "Zimbabwe",
      "artist": "Matt Redman (Shona version)",
      "releasedYear": 2011,
      "youtubeSearch": "Ruware Rukuru 10000 Reasons Shona",
      "popularity": "YouTube gospel · Zim gospel radio"
    },
    {
      "slug": "nzoto-na-motema",
      "title": "Nzoto Na Motema",
      "alternateTitle": "Way Maker Lingala",
      "language": "lingala",
      "languageName": "Lingala",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1450558415837-1f5e21a17709?w=800&q=80",
      "excerpt": "Lingala version of \"Way Maker\". Vibrant in Kinshasa and Congo-Brazzaville churches.",
      "tags": [
        "hymn",
        "lingala",
        "worship",
        "praise",
        "popular"
      ],
      "region": "DRC / Congo",
      "artist": "Sinach (Lingala translation)",
      "releasedYear": 2015,
      "youtubeSearch": "Nzoto Na Motema Way Maker Lingala",
      "popularity": "YouTube Congo gospel 50M+ views"
    },
    {
      "slug": "tatase-bolingo",
      "title": "Tatase Bolingo",
      "alternateTitle": "Good Good Father Lingala",
      "language": "lingala",
      "languageName": "Lingala",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1739834728302-a67c905da6fb?w=800&q=80",
      "excerpt": "Lingala rendition of \"Good Good Father\". Beautiful in Lingala worship.",
      "tags": [
        "hymn",
        "lingala",
        "father",
        "worship",
        "popular"
      ],
      "region": "DRC / Republic of Congo",
      "artist": "Chris Tomlin (Lingala version)",
      "releasedYear": 2014,
      "youtubeSearch": "Tatase Bolingo Good Good Father Lingala",
      "popularity": "YouTube gospel · TikTok Lingala"
    },
    {
      "slug": "maloba-na-ngai",
      "title": "Maloba Na Ngai",
      "alternateTitle": "Amazing Grace Lingala",
      "language": "lingala",
      "languageName": "Lingala",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1775400713633-e4b2b3577fb7?w=800&q=80",
      "excerpt": "Lingala worship song of gratitude. Sung across Congolese churches worldwide.",
      "tags": [
        "hymn",
        "lingala",
        "gratitude",
        "worship",
        "contemporary"
      ],
      "region": "DRC / Congo",
      "artist": "Chris Tomlin (Lingala version)",
      "releasedYear": 2006,
      "youtubeSearch": "Maloba Na Ngai Amazing Grace Lingala",
      "popularity": "YouTube gospel · Congo diaspora"
    },
    {
      "slug": "onwe-m-ka",
      "title": "Onwe M Ka",
      "alternateTitle": "Way Maker Igbo",
      "language": "igbo",
      "languageName": "Igbo",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1633706719314-bd15300113cc?w=800&q=80",
      "excerpt": "Igbo version of \"Way Maker\". Originated in Nigeria and beloved across the diaspora.",
      "tags": [
        "hymn",
        "igbo",
        "worship",
        "praise",
        "popular"
      ],
      "region": "Nigeria",
      "artist": "Sinach (Igbo translation)",
      "releasedYear": 2015,
      "youtubeSearch": "Onwe M Ka Way Maker Igbo",
      "popularity": "YouTube gospel 40M+ views Nigeria"
    },
    {
      "slug": "nna-oma",
      "title": "Nna Oma",
      "alternateTitle": "Good Good Father Igbo",
      "language": "igbo",
      "languageName": "Igbo",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1775400713633-e4b2b3577fb7?w=800&q=80",
      "excerpt": "Igbo rendition of \"Good Good Father\". Beautiful in Igbo Pentecostal worship.",
      "tags": [
        "hymn",
        "igbo",
        "father",
        "worship",
        "popular"
      ],
      "region": "Nigeria",
      "artist": "Chris Tomlin (Igbo version)",
      "releasedYear": 2014,
      "youtubeSearch": "Nna Oma Good Good Father Igbo",
      "popularity": "YouTube gospel · TikTok Igbo worship"
    },
    {
      "slug": "ebere-m-million",
      "title": "Ebere M Million",
      "alternateTitle": "10,000 Reasons Igbo",
      "language": "igbo",
      "languageName": "Igbo",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1607947243050-93d773ede731?w=800&q=80",
      "excerpt": "Igbo worship song of countless reasons to praise God. Popular in eastern Nigeria.",
      "tags": [
        "hymn",
        "igbo",
        "praise",
        "worship",
        "popular"
      ],
      "region": "Nigeria",
      "artist": "Matt Redman (Igbo version)",
      "releasedYear": 2011,
      "youtubeSearch": "Ebere M Million 10000 Reasons Igbo",
      "popularity": "YouTube gospel · Nigerian gospel radio"
    },
    {
      "slug": "oni-buru-buru",
      "title": "Oni Buru Buru",
      "alternateTitle": "Way Maker Yoruba",
      "language": "yoruba",
      "languageName": "Yoruba",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1607947243050-93d773ede731?w=800&q=80",
      "excerpt": "Yoruba version of \"Way Maker\" — Sinach's home-tongue translation of her global hit.",
      "tags": [
        "hymn",
        "yoruba",
        "worship",
        "praise",
        "popular"
      ],
      "region": "Nigeria",
      "artist": "Sinach (Yoruba version)",
      "releasedYear": 2015,
      "youtubeSearch": "Oni Buru Buru Way Maker Yoruba Sinach",
      "popularity": "YouTube Sinach official 100M+ views"
    },
    {
      "slug": "baba-to-dara",
      "title": "Baba To Dara",
      "alternateTitle": "Good Good Father Yoruba",
      "language": "yoruba",
      "languageName": "Yoruba",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1536063766742-b514ee70707f?w=800&q=80",
      "excerpt": "Yoruba rendition of \"Good Good Father\". Sweet and tender in Yoruba worship.",
      "tags": [
        "hymn",
        "yoruba",
        "father",
        "worship",
        "popular"
      ],
      "region": "Nigeria",
      "artist": "Chris Tomlin (Yoruba version)",
      "releasedYear": 2014,
      "youtubeSearch": "Baba To Dara Good Good Father Yoruba",
      "popularity": "YouTube gospel · TikTok Yoruba"
    },
    {
      "slug": "oluwa-mi-nla",
      "title": "Oluwa Mi Nla",
      "alternateTitle": "How Great Is Our God Yoruba",
      "language": "yoruba",
      "languageName": "Yoruba",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1739834728302-a67c905da6fb?w=800&q=80",
      "excerpt": "Yoruba translation of \"How Great Is Our God\" — vibrant in Yoruba churches worldwide.",
      "tags": [
        "hymn",
        "yoruba",
        "praise",
        "contemporary",
        "popular"
      ],
      "region": "Nigeria",
      "artist": "Chris Tomlin (Yoruba version)",
      "releasedYear": 2004,
      "youtubeSearch": "Oluwa Mi Nla How Great Yoruba",
      "popularity": "YouTube gospel · Nigerian gospel radio"
    },
    {
      "slug": "yesus-amasegenan",
      "title": "Yesus Amasegenan",
      "alternateTitle": "Way Maker Amharic",
      "language": "amharic",
      "languageName": "Amharic",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1769755410096-6c7a85d13f86?w=800&q=80",
      "excerpt": "Amharic rendition of \"Way Maker\". Beautiful in Ethiopian and Eritrean churches.",
      "tags": [
        "hymn",
        "amharic",
        "worship",
        "praise",
        "popular"
      ],
      "region": "Ethiopia / Eritrea",
      "artist": "Sinach (Amharic translation)",
      "releasedYear": 2015,
      "youtubeSearch": "Yesus Amasegenan Way Maker Amharic",
      "popularity": "YouTube Ethiopian gospel · Instagram"
    },
    {
      "slug": "abba-yesus",
      "title": "Abba Yesus",
      "alternateTitle": "Good Good Father Amharic",
      "language": "amharic",
      "languageName": "Amharic",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1750688468246-4679eaea864b?w=800&q=80",
      "excerpt": "Amharic version of \"Good Good Father\". Tender in Ethiopian Orthodox and Pentecostal churches.",
      "tags": [
        "hymn",
        "amharic",
        "father",
        "worship",
        "popular"
      ],
      "region": "Ethiopia",
      "artist": "Chris Tomlin (Amharic version)",
      "releasedYear": 2014,
      "youtubeSearch": "Abba Yesus Good Good Father Amharic",
      "popularity": "YouTube Ethiopian gospel · TikTok"
    },
    // ============================================
    // FRENCH HYMNS
    // ============================================
    {
      "slug": "dieu-seul",
      "title": "Dieu seul",
      "alternateTitle": "God Alone",
      "language": "french",
      "languageName": "French",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80",
      "excerpt": "French worship song declaring God alone as our refuge and strength.",
      "tags": ["hymn", "french", "worship", "god-alone"],
      "region": "France / Francophone Africa",
      "artist": "Contemporary French worship",
      "youtubeSearch": "Dieu seul worship french"
    },
    {
      "slug": "grace-incroyable",
      "title": "Grace Incroyable",
      "alternateTitle": "Amazing Grace French",
      "language": "french",
      "languageName": "French",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800&q=80",
      "excerpt": "The beloved hymn Amazing Grace in French translation.",
      "tags": ["hymn", "french", "grace", "classic"],
      "region": "France / Francophone Africa",
      "artist": "John Newton (French)",
      "releasedYear": 1779,
      "youtubeSearch": "Grace Incroyable Amazing Grace french worship"
    },
    {
      "slug": "mon-dieu-tu-es-grand",
      "title": "Mon Dieu, Tu Es Grand",
      "alternateTitle": "How Great Is Our God French",
      "language": "french",
      "languageName": "French",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&q=80",
      "excerpt": "French worship anthem celebrating the greatness of God.",
      "tags": ["hymn", "french", "praise", "greatness"],
      "region": "France / Francophone Africa",
      "artist": "Chris Tomlin (French)",
      "youtubeSearch": "Mon Dieu Tu Es Grand french worship"
    },
    {
      "slug": "tu-es-la-reponse",
      "title": "Tu Es La Réponse",
      "alternateTitle": "Way Maker French",
      "language": "french",
      "languageName": "French",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&q=80",
      "excerpt": "French rendition of the global worship hit Way Maker.",
      "tags": ["hymn", "french", "praise", "worship"],
      "region": "France / Francophone Africa",
      "artist": "Sinach (French translation)",
      "youtubeSearch": "Tu Es La Reponse Way Maker french"
    },
    // ============================================
    // PORTUGUESE HYMNS
    // ============================================
    {
      "slug": "deus-e-bom",
      "title": "Deus É Bom",
      "alternateTitle": "Good Good Father Portuguese",
      "language": "portuguese",
      "languageName": "Portuguese",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
      "excerpt": "Portuguese version of Good Good Father — a heartfelt declaration of God's love.",
      "tags": ["hymn", "portuguese", "father", "love"],
      "region": "Brazil / Portugal / Mozambique",
      "artist": "Chris Tomlin (Portuguese)",
      "youtubeSearch": "Deus e Bom Good Good Father Portuguese"
    },
    {
      "slug": "maravilhoso- Deus",
      "title": "Maravilhoso Deus",
      "alternateTitle": "Awesome God Portuguese",
      "language": "portuguese",
      "languageName": "Portuguese",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&q=80",
      "excerpt": "Portuguese worship song declaring God's awesome power.",
      "tags": ["hymn", "portuguese", "praise", "power"],
      "region": "Brazil / Portugal",
      "artist": "Contemporary Brazilian worship",
      "youtubeSearch": "Maravilhoso Deus Awesome God Portuguese"
    },
    {
      "slug": "tu-e-o-caminho",
      "title": "Tu És O Caminho",
      "alternateTitle": "Way Maker Portuguese",
      "language": "portuguese",
      "languageName": "Portuguese",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "excerpt": "Portuguese version of Way Maker — miracle worker, promise keeper.",
      "tags": ["hymn", "portuguese", "praise", "worship"],
      "region": "Brazil / Angola / Mozambique",
      "artist": "Sinach (Portuguese)",
      "youtubeSearch": "Tu es o Caminho Way Maker Portuguese worship"
    },
    {
      "slug": "graça-maravilhosa",
      "title": "Graça Maravilhosa",
      "alternateTitle": "Amazing Grace Portuguese",
      "language": "portuguese",
      "languageName": "Portuguese",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "excerpt": "The timeless hymn Amazing Grace in beautiful Portuguese.",
      "tags": ["hymn", "portuguese", "grace", "classic"],
      "region": "Brazil / Portugal",
      "artist": "John Newton (Portuguese)",
      "youtubeSearch": "Graca Maravilhosa Amazing Grace Portuguese"
    },
    // ============================================
    // SPANISH HYMNS
    // ============================================
    {
      "slug": "dios-es-bueno",
      "title": "Dios Es Bueno",
      "alternateTitle": "Good Good Father Spanish",
      "language": "spanish",
      "languageName": "Spanish",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80",
      "excerpt": "Spanish worship song about God's perfect love as a father.",
      "tags": ["hymn", "spanish", "father", "love"],
      "region": "Latin America / Spain",
      "artist": "Chris Tomlin (Spanish)",
      "youtubeSearch": "Dios es Bueno Good Good Father Spanish"
    },
    {
      "slug": "grande-es-tu",
      "title": "Grande Es Tu",
      "alternateTitle": "How Great Is Our God Spanish",
      "language": "spanish",
      "languageName": "Spanish",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
      "excerpt": "Spanish anthem celebrating the greatness of our God.",
      "tags": ["hymn", "spanish", "praise", "greatness"],
      "region": "Latin America / Spain",
      "artist": "Chris Tomlin (Spanish)",
      "youtubeSearch": "Grande Es Tu How Great Is Our God Spanish"
    },
    {
      "slug": "eres-el-camino",
      "title": "Eres El Camino",
      "alternateTitle": "Way Maker Spanish",
      "language": "spanish",
      "languageName": "Spanish",
      "key": "E",
      "chords": "E - B - C#m - A",
      "image": "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
      "excerpt": "Spanish rendition of Way Maker — miracle working God.",
      "tags": ["hymn", "spanish", "praise", "worship"],
      "region": "Latin America / Spain",
      "artist": "Sinach (Spanish)",
      "youtubeSearch": "Eres el Camino Way Maker Spanish worship"
    },
    {
      "slug": "gracia-sublime",
      "title": "Gracia Sublime",
      "alternateTitle": "Amazing Grace Spanish",
      "language": "spanish",
      "languageName": "Spanish",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80",
      "excerpt": "The beloved hymn Amazing Grace in Spanish.",
      "tags": ["hymn", "spanish", "grace", "classic"],
      "region": "Latin America / Spain",
      "artist": "John Newton (Spanish)",
      "youtubeSearch": "Gracia Sublime Amazing Grace Spanish worship"
    },
    // ============================================
    // GERMAN HYMNS
    // ============================================
    {
      "slug": "gott-ist-gut",
      "title": "Gott Ist Gut",
      "alternateTitle": "Good Good Father German",
      "language": "german",
      "languageName": "German",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=800&q=80",
      "excerpt": "German worship song declaring God's goodness and love.",
      "tags": ["hymn", "german", "father", "love"],
      "region": "Germany / Austria / Switzerland",
      "artist": "Chris Tomlin (German)",
      "youtubeSearch": "Gott Ist Gut Good Good Father German"
    },
    {
      "slug": "wie-gross-ist-gott",
      "title": "Wie Gross Ist Gott",
      "alternateTitle": "How Great Is Our God German",
      "language": "german",
      "languageName": "German",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80",
      "excerpt": "German worship anthem celebrating God's greatness.",
      "tags": ["hymn", "german", "praise", "greatness"],
      "region": "Germany / Austria / Switzerland",
      "artist": "Chris Tomlin (German)",
      "youtubeSearch": "Wie Gross Ist Gott How Great Is Our God German"
    },
    // ============================================
    // CHINESE HYMNS
    // ============================================
    {
      "slug": "zhu-chong-bai",
      "title": "主崇拜",
      "alternateTitle": "Worship the Lord Chinese",
      "language": "chinese",
      "languageName": "Chinese",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&q=80",
      "excerpt": "Chinese worship song praising God's holy name.",
      "tags": ["hymn", "chinese", "worship", "praise"],
      "region": "China / Taiwan / Singapore",
      "artist": "Contemporary Chinese worship",
      "youtubeSearch": "主崇拜 Chinese worship hymn"
    },
    {
      "slug": "shi-jian-de-zan-mei",
      "title": "时间的赞美",
      "alternateTitle": "10,000 Reasons Chinese",
      "language": "chinese",
      "languageName": "Chinese",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=800&q=80",
      "excerpt": "Chinese worship song with 10,000 reasons to bless the Lord.",
      "tags": ["hymn", "chinese", "praise", "worship"],
      "region": "China / Taiwan",
      "artist": "Matt Redman (Chinese)",
      "youtubeSearch": "时间的赞美 10000 reasons Chinese worship"
    },
    {
      "slug": "wan-hua-he-ai",
      "title": "万华和爱",
      "alternateTitle": "All Heaven and Love",
      "language": "chinese",
      "languageName": "Chinese",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      "excerpt": "Beautiful Chinese worship about heaven's love reaching earth.",
      "tags": ["hymn", "chinese", "love", "heaven"],
      "region": "China / Taiwan / Singapore",
      "artist": "Traditional Chinese hymn",
      "youtubeSearch": "万华和爱 Chinese worship hymn"
    },
    // ============================================
    // JAPANESE HYMNS
    // ============================================
    {
      "slug": "kami-sama-wa-sugoi",
      "title": "神様はすごい",
      "alternateTitle": "How Great Is Our God Japanese",
      "language": "japanese",
      "languageName": "Japanese",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80",
      "excerpt": "Japanese worship song celebrating God's incredible greatness.",
      "tags": ["hymn", "japanese", "praise", "greatness"],
      "region": "Japan",
      "artist": "Chris Tomlin (Japanese)",
      "youtubeSearch": "神様はすごい Japanese worship hymn"
    },
    {
      "slug": "shiawase-no-tame-no-inori",
      "title": "幸せのための祈り",
      "alternateTitle": "Prayer for Happiness",
      "language": "japanese",
      "languageName": "Japanese",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80",
      "excerpt": "Japanese worship song of prayer and gratitude.",
      "tags": ["hymn", "japanese", "prayer", "gratitude"],
      "region": "Japan",
      "artist": "Contemporary Japanese worship",
      "youtubeSearch": "幸せのための祈り Japanese worship hymn"
    },
    // ============================================
    // VIETNAMESE HYMNS
    // ============================================
    {
      "slug": "ngai-cha-tot-lao",
      "title": "Ngài Cha Tốt Lành",
      "alternateTitle": "Good Good Father Vietnamese",
      "language": "vietnamese",
      "languageName": "Vietnamese",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
      "excerpt": "Vietnamese worship song declaring God as our perfect Father.",
      "tags": ["hymn", "vietnamese", "father", "love"],
      "region": "Vietnam",
      "artist": "Chris Tomlin (Vietnamese)",
      "youtubeSearch": "Ngai Cha Tot Lành Good Good Father Vietnamese"
    },
    {
      "slug": "thien-chuong-vinh-quang",
      "title": "Tiếng Chuông Vinh Quang",
      "alternateTitle": "Glorious Bell",
      "language": "vietnamese",
      "languageName": "Vietnamese",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
      "excerpt": "Vietnamese worship song about God's glorious name.",
      "tags": ["hymn", "vietnamese", "praise", "glory"],
      "region": "Vietnam",
      "artist": "Traditional Vietnamese hymn",
      "youtubeSearch": "Tiếng Chuông Vinh Quang Vietnamese worship"
    },
    // ============================================
    // ARABIC HYMNS
    // ============================================
    {
      "slug": "allah-kabir",
      "title": "الله كبير",
      "alternateTitle": "God Is Great Arabic",
      "language": "arabic",
      "languageName": "Arabic",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1465795451132-a1f4b20c7af3?w=800&q=80",
      "excerpt": "Arabic worship song declaring the greatness of God.",
      "tags": ["hymn", "arabic", "praise", "greatness"],
      "region": "Middle East / North Africa",
      "artist": "Contemporary Arabic worship",
      "youtubeSearch": "الله كبير Arabic worship hymn"
    },
    {
      "slug": "ya-rab-albi",
      "title": "يا رب قلبي",
      "alternateTitle": "O Lord My Heart",
      "language": "arabic",
      "languageName": "Arabic",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?w=800&q=80",
      "excerpt": "Arabic worship song of devotion and heartfelt prayer.",
      "tags": ["hymn", "arabic", "prayer", "devotion"],
      "region": "Middle East / North Africa",
      "artist": "Traditional Arabic hymn",
      "youtubeSearch": "يا رب قلبي Arabic worship hymn"
    },
    // ============================================
    // HINDI HYMNS
    // ============================================
    {
      "slug": "bhagwan-bada-hai",
      "title": "भगवान बड़ा है",
      "alternateTitle": "God Is Great Hindi",
      "language": "hindi",
      "languageName": "Hindi",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
      "excerpt": "Hindi worship song celebrating God's greatness.",
      "tags": ["hymn", "hindi", "praise", "greatness"],
      "region": "India",
      "artist": "Contemporary Indian worship",
      "youtubeSearch": "भगवान बड़ा है Hindi worship hymn"
    },
    {
      "slug": "prabhu-tum-bada",
      "title": "प्रभु तुम बड़ा",
      "alternateTitle": "Lord You Are Great",
      "language": "hindi",
      "languageName": "Hindi",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      "excerpt": "Hindi worship song of praise and adoration.",
      "tags": ["hymn", "hindi", "praise", "adoration"],
      "region": "India",
      "artist": "Indian Christian worship",
      "youtubeSearch": "प्रभु तुम बड़ा Hindi worship"
    },
    // ============================================
    // INDONESIAN HYMNS
    // ============================================
    {
      "slug": "tuhan-baik",
      "title": "Tuhan Baik",
      "alternateTitle": "Good Good Father Indonesian",
      "language": "indonesian",
      "languageName": "Indonesian",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1502786129293-79981df4e689?w=800&q=80",
      "excerpt": "Indonesian worship song about God's perfect goodness.",
      "tags": ["hymn", "indonesian", "father", "love"],
      "region": "Indonesia",
      "artist": "Chris Tomlin (Indonesian)",
      "youtubeSearch": "Tuhan Baik Good Good Father Indonesian"
    },
    {
      "slug": "besar-tuhan",
      "title": "Besar Tuhan",
      "alternateTitle": "How Great Is Our God Indonesian",
      "language": "indonesian",
      "languageName": "Indonesian",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&q=80",
      "excerpt": "Indonesian worship anthem celebrating God's majesty.",
      "tags": ["hymn", "indonesian", "praise", "majesty"],
      "region": "Indonesia",
      "artist": "Chris Tomlin (Indonesian)",
      "youtubeSearch": "Besar Tuhan How Great Is Our God Indonesian"
    },
    // ============================================
    // FILIPINO/TAGALOG HYMNS
    // ============================================
    {
      "slug": "diyos-maayo-kanato",
      "title": "Diyos Maayo Kanato",
      "alternateTitle": "Good Good Father Filipino",
      "language": "tagalog",
      "languageName": "Filipino",
      "key": "A",
      "chords": "A - E - F#m - D",
      "image": "https://images.unsplash.com/photo-1502920514313-52581002a659?w=800&q=80",
      "excerpt": "Filipino worship song declaring God's goodness and love.",
      "tags": ["hymn", "filipino", "father", "love"],
      "region": "Philippines",
      "artist": "Chris Tomlin (Filipino)",
      "youtubeSearch": "Diyos Maayo Kanato Good Good Father Filipino"
    },
    {
      "slug": "dakilang-diyos",
      "title": "Dakilang Diyos",
      "alternateTitle": "Great God Filipino",
      "language": "tagalog",
      "languageName": "Filipino",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
      "excerpt": "Filipino worship song praising God's greatness.",
      "tags": ["hymn", "filipino", "praise", "greatness"],
      "region": "Philippines",
      "artist": "Contemporary Filipino worship",
      "youtubeSearch": "Dakilang Diyos Great God Filipino worship"
    },
    // ============================================
    // TAMIL HYMNS
    // ============================================
    {
      "slug": "naan-yesu",
      "title": "நான் ஏசு",
      "alternateTitle": "I Am Jesus Tamil",
      "language": "tamil",
      "languageName": "Tamil",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
      "excerpt": "Tamil worship song declaring faith in Jesus.",
      "tags": ["hymn", "tamil", "jesus", "faith"],
      "region": "Sri Lanka / Tamil Nadu",
      "artist": "Contemporary Tamil worship",
      "youtubeSearch": "நான் ஏசு Tamil worship hymn"
    },
    {
      "slug": "naan-thunai",
      "title": "நான் துணை",
      "alternateTitle": "I Am Your Help Tamil",
      "language": "tamil",
      "languageName": "Tamil",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
      "excerpt": "Tamil worship song about God's sustaining presence.",
      "tags": ["hymn", "tamil", "help", "presence"],
      "region": "Sri Lanka / Tamil Nadu",
      "artist": "Traditional Tamil hymn",
      "youtubeSearch": "நான் துணை Tamil worship hymn"
    },
    // ============================================
    // PERSIAN HYMNS
    // ============================================
    {
      "slug": "khoda-bozorg-ast",
      "title": "خدابزرگ است",
      "alternateTitle": "God Is Great Persian",
      "language": "persian",
      "languageName": "Persian",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1483046196206-2ac1d868挤e7f?w=800&q=80",
      "excerpt": "Persian worship song celebrating God's greatness.",
      "tags": ["hymn", "persian", "praise", "greatness"],
      "region": "Iran / Afghanistan",
      "artist": "Persian Christian worship",
      "youtubeSearch": "خدابزرگ است Persian worship hymn"
    },
    // ============================================
    // RUSSIAN HYMNS
    // ============================================
    {
      "slug": "bog-slavnyy",
      "title": "Бог славный",
      "alternateTitle": "Glorious God Russian",
      "language": "russian",
      "languageName": "Russian",
      "key": "G",
      "chords": "G - D - Em - C",
      "image": "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d?w=800&q=80",
      "excerpt": "Russian worship song praising God's glorious name.",
      "tags": ["hymn", "russian", "praise", "glory"],
      "region": "Russia / Ukraine / Belarus",
      "artist": "Russian Orthodox tradition",
      "youtubeSearch": "Бог славный Russian worship hymn"
    },
    {
      "slug": "gospodi-miloserdnyy",
      "title": "Господи милосердный",
      "alternateTitle": "Lord Have Mercy Russian",
      "language": "russian",
      "languageName": "Russian",
      "key": "C",
      "chords": "C - G - Am - F",
      "image": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "excerpt": "Russian prayer hymn asking for God's mercy.",
      "tags": ["hymn", "russian", "prayer", "mercy"],
      "region": "Russia / Ukraine",
      "artist": "Traditional Russian hymn",
      "youtubeSearch": "Господи милосердный Russian worship hymn"
    }
];

/* ------------------------------------------------------------------ *
 *  Helpers used by both listing and detail pages
 * ------------------------------------------------------------------ */
export function getHymnBySlug(slug: string): Hymn | undefined {
  return hymns.find((h) => h.slug === slug);
}

export function getRelatedHymns(hymn: Hymn, count = 3): Hymn[] {
  return hymns
    .filter((h) => h.slug !== hymn.slug && h.language === hymn.language)
    .slice(0, count);
}

/**
 * Build a YouTube watch URL — pinned video if we have an ID, else
 * a YouTube search URL built from the song title + artist.
 *
 * We prefer search URLs as a fallback because they never 404: even
 * if the original video is taken down, the search results will surface
 * the next-best match.
 */
export function getYouTubeUrl(hymn: Hymn): string {
  if (hymn.youtubeId) return `https://www.youtube.com/watch?v=${hymn.youtubeId}`;
  const q = encodeURIComponent(hymn.youtubeSearch || `${hymn.title} ${hymn.artist || ''}`.trim());
  return `https://www.youtube.com/results?search_query=${q}`;
}

export function getYouTubeEmbedUrl(hymn: Hymn): string | null {
  if (!hymn.youtubeId) return null;
  return `https://www.youtube.com/embed/${hymn.youtubeId}?rel=0`;
}

export function getSpotifySearchUrl(hymn: Hymn): string {
  const q = encodeURIComponent(`${hymn.title} ${hymn.artist || ''}`.trim());
  return `https://open.spotify.com/search/${q}`;
}

export function getAppleMusicSearchUrl(hymn: Hymn): string {
  const q = encodeURIComponent(`${hymn.title} ${hymn.artist || ''}`.trim());
  return `https://music.apple.com/search?term=${q}`;
}

export function getSoundCloudSearchUrl(hymn: Hymn): string {
  const q = encodeURIComponent(`${hymn.title} ${hymn.artist || ''}`.trim());
  return `https://soundcloud.com/search?q=${q}`;
}
