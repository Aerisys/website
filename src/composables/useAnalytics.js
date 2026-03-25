const GTM_ID = 'GTM-PKN4HG6L'
const GA_ID = 'G-JSHP2FBZKB'

let initialized = false

export function initAnalytics() {
  if (initialized) return
  initialized = true

  // Google Tag Manager
  const gtmScript = document.createElement('script')
  gtmScript.textContent = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${GTM_ID}');
  `
  document.head.appendChild(gtmScript)

  // gtag.js
  const gtagScript = document.createElement('script')
  gtagScript.async = true
  gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(gtagScript)

  window.dataLayer = window.dataLayer || []
  function gtag() { window.dataLayer.push(arguments) }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_ID, { send_page_view: false })
}

export function trackPageView(path, title) {
  if (!initialized || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
  })
}
