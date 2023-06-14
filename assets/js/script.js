const url = window.location.href.substring(0, window.location.href.lastIndexOf("/"));
const imgsPath = url + "/assets/img";

const navigate = (docID) => {
    const path = `${url}/news.html?id=${docID}`;
    window.location.assign(path);
};

const calculateIdealImgSize = () => {
    const windowWidth = document.documentElement.clientWidth;
    let imgWidth, imgHeight;

    if(windowWidth <= 576){
        imgHeight = "300px"
        imgWidth = "300px"
    }
    else if(windowWidth <= 768){
        imgHeight = "300px"
        imgWidth = "600px"
    }else if(windowWidth <= 992){
        imgHeight = "450px"
        imgWidth = "750px"
    }else if(windowWidth <= 1200){
        imgHeight = "600px"
        imgWidth = "800px"
    }else{
        imgHeight = "750px"
        imgWidth = "950px"
    }

    return { imgWidth, imgHeight };
};

const renderCard = (news, imgWidth, imgHeight) => {
    const { id, title, subtitle, uptime } = news;

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("container");

    const card = document.createElement("div");
    card.classList.add("card", "text-bg-dark");
    card.role = "button";
    card.addEventListener("click", () => {
        navigate(id);
    });

    const preloadImage = new Image();
    preloadImage.src = `${imgsPath}/1200x800/image${id}.avif`;

    const imgCard = document.createElement("img");
    imgCard.classList.add("card-img", "w-100");
    imgCard.style.width = imgWidth;
    imgCard.style.height = imgHeight;
    imgCard.srcset = `${imgsPath}/1200x800/image${id}.avif 1200w, ${imgsPath}/600x400/image${id}.avif 600w`;
    imgCard.alt = `image${id}`;

    const cardOverlayText = document.createElement("div");
    cardOverlayText.classList.add("card-img-overlay", "text-white", "d-flex", "flex-column");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title", "cardText");
    cardTitle.textContent = title;

    const cardSubTitle = document.createElement("p");
    cardSubTitle.classList.add("card-text", "cardText");
    cardSubTitle.textContent = subtitle;

    const cardNewsTime = document.createElement("p");
    cardNewsTime.classList.add("card-title", "cardText");
    const cardNewsTimeSmall = document.createElement("small");
    cardNewsTimeSmall.textContent = `Last updated ${uptime} days ago`;

    card.append(imgCard);
    cardOverlayText.append(cardTitle);
    cardOverlayText.append(cardSubTitle);
    cardNewsTime.append(cardNewsTimeSmall);
    cardOverlayText.append(cardNewsTime);
    card.append(cardOverlayText);
    cardDiv.append(card);

    return cardDiv;
};

const renderNews = () => {
    const newsContainer = document.querySelector("#newsContainer");
    const { imgWidth, imgHeight } = calculateIdealImgSize();

    for (let index = 0; index < news.length; index++) {
        const card = renderCard(news[index], imgWidth, imgHeight);

        newsContainer.append(card);
    }
};

window.addEventListener("load", renderNews);
