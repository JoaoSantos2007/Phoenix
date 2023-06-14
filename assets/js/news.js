const url = location.href.substring(0, location.href.lastIndexOf("/"));
const imgPath = `${url}/assets/img`;

const getQueryParams = () => {
  const query = location.search;

  const params = {};
  const queryString = query.slice(1).split('&');
  for (const param of queryString) {
    const [key, value] = param.split('=');
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value || '');

    if (decodedKey.length) {
      params[decodedKey] = decodedValue;
    }
  }

  return params;
};

const createNewsHeader = (title, subtitle) => {
  const newsHeader = document.createElement("div");
  newsHeader.classList.add("d-flex", "flex-column", "align-items-center");

  const newsTitle = document.createElement("h1");
  newsTitle.classList.add("text-center", "fs-2", "fw-bold");
  newsTitle.textContent = title;

  const newsSubtitle = document.createElement("h2");
  newsSubtitle.classList.add("text-center", "fs-4", "mt-1");
  newsSubtitle.textContent = subtitle;

  newsHeader.append(newsTitle, newsSubtitle);

  return newsHeader;
};

const createNewsImg = (id) => {
  return new Promise((resolve, reject) => {
    const newsImg = document.createElement("img");
    newsImg.classList.add("my-4");
    newsImg.style.width = "100%";
    newsImg.style.height = "100%";
    newsImg.srcset = `${imgPath}/1200x800/image${id}.avif 1200w,
                   ${imgPath}/600x400/image${id}.avif 600w`;
    newsImg.alt = `Image${id}`;

    newsImg.onload = () => resolve(newsImg);
    newsImg.onerror = reject;

    return newsImg;
  });
};

const createNewsTexts = (texts) => {
  const newsTexts = document.createElement("div");
  newsTexts.classList.add("d-flex", "flex-column", "align-items-center");
  
  for (const text of texts) {
    const paragraph = document.createElement("p");
    paragraph.classList.add("fs-5");
    paragraph.textContent = text;

    newsTexts.appendChild(paragraph);
  }

  return newsTexts;
};

const createNewsFont = (font) => {
  const newsFont = document.createElement("p");
  newsFont.classList.add("fs-3", "my-2")
  newsFont.innerHTML = `<strong>Fonte: </strong>${font}`

  return newsFont
}

const renderNews = async () => {
  const params = getQueryParams();
  const newsId = params.id;
  const { title, subtitle, id, texts, font } = news[newsId - 1];

  const newsHeader = createNewsHeader(title, subtitle);
  const newsImg = await createNewsImg(id);
  const newsTexts = createNewsTexts(texts);
  const newsFont = createNewsFont(font);

  const newsContent = document.querySelector("#newsContent");
  newsContent.append(newsHeader, newsImg, newsTexts, newsFont);
};

window.addEventListener("load", renderNews);