export function getEmbedContent(embed) {
  const stringToHTML = function(str) {
    const domContainer = document.createElement("span");
    domContainer.innerHTML = str;
    return domContainer;
  };

  const parentEmbed = stringToHTML(embed);

  let oldIframe = parentEmbed.querySelectorAll("oembed");
  oldIframe = Array.from(oldIframe);

  for (const i in oldIframe) {
    //Get the url from oembed tag
    let url = oldIframe[i].getAttribute("url");
    //Replace 'watch?v' with 'embed/'
    url = url.replace("watch?v=", "embed/");

    //Create a iframe tag
    const newIframe = document.createElement("iframe");
    newIframe.setAttribute("width", "150px");
    newIframe.setAttribute("height", "120px");
    newIframe.setAttribute("allowFullScreen", "");
    newIframe.setAttribute("frameBorder", 0);
    if (url) {
      newIframe.setAttribute("src", url);
    }
    // replace oldIframe with newIframe
    oldIframe[i].parentNode.replaceChild(newIframe, oldIframe[i]);
  }

  return parentEmbed.outerHTML;
}
