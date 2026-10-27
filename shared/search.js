// Search the same normalized text in either site language.
(function () {
  const alphabet = { а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sht',ъ:'a',ь:'y',ю:'yu',я:'ya' };
  function normalize(value) {
    return String(value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[а-я]/g, letter => alphabet[letter] || letter).replace(/\s+/g, ' ').trim();
  }
  window.AKMatchesSearch = function (listing, query) {
    const words = normalize(query).split(' ').filter(Boolean);
    const text = normalize(['id','title','city','area','title_en','city_en','area_en','property_type','listing_type']
      .map(key => listing[key]).join(' '));
    return words.every(word => text.includes(word));
  };
})();
