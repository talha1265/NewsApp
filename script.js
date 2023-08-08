const  API_KEY = "9c27396d21f746bca2b1c910104675e1";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load",()=>fetchNews("India"));
function reload() {
    window.location.reload();
}
async function fetchNews(query){
    const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer= document.getElementById("cards_container");
    const newsCardtemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML='';

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardtemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
      });
    }
    

function fillDataInCard(cardClone,article){
    const newImg=cardClone.querySelector('#news-img');
    const newTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newDesc=cardClone.querySelector('#news-desc');
    newImg.src = article.urlToImage;
    newTitle.innerHTML=article.title;
    newDesc.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });
    newsSource.innerHTML=`${article.source.name}-${date}`;
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
        //it open article url in the blank tab which is new tab
    })
}
function onNavItemClick(id){
    fetchNews(id);

}