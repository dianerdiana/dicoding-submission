const similarNews = [
  {
    id: 1,
    title: "A Decision Victory for Progressive Policies",
    tag: "Politics",
    like_total: 2245,
    share_total: 60,
    href: "/",
    image_url: "./assets/article-image-01.jpg",
  },
  {
    id: 2,
    title: "Tech Giants Unveil Cutting-Edge AI Innovations",
    tag: "Technology",
    like_total: 6012,
    share_total: 92,
    href: "/",
    image_url: "./assets/article-image-02.jpg",
  },
  {
    id: 3,
    title: "COVID-19 Variants",
    tag: "Health",
    like_total: 10004,
    share_total: 124,
    href: "/",
    image_url: "./assets/article-image-03.jpg",
  },
];

const formatNumber = (num) => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
};

document.addEventListener("DOMContentLoaded", () => {
  const articleContainer = document.getElementById("similar_news__items");

  for (let idx = 0; idx < similarNews.length; idx++) {
    const news = similarNews[idx];

    const newsItem = document.createElement("li");
    newsItem.classList.add("similar_news__list_item");

    newsItem.innerHTML = `
      <article class="similar_news__article_card">
        <div class="similar_news__article_img_cover_wrapper">
          <img
            src="${news.image_url}"
            alt="${news.title} Image"
            class="similar_news__article_img_cover"
          />
        </div>
        <h3 class="similar_news__article_title">
          ${news.title}
        </h3>
        <p class="similar_news__article_tag">${news.tag}</p>
        <footer class="similar_news__article_footer">
          <div class="similar_news__article_btn_wrapper">
            <button class="similar_news__article_btn">
              <i data-feather="heart"></i> <span>${formatNumber(
                news.like_total
              )}</span>
            </button>
            <button class="similar_news__article_btn">
              <i data-feather="send"></i> <span>${formatNumber(
                news.share_total
              )}</span>
            </button>
          </div>

          <div class="similar_news__article_btn_readmore_wrapper">
            <a href="${news.href}" class="similar_news__article_btn_readmore">
              <span>Readmore</span> <i data-feather="arrow-up-right"></i>
            </a>
          </div>
        </footer>
      </article>
    `;

    articleContainer.append(newsItem);
  }

  if (window.feather) {
    feather.replace();
  }
});
