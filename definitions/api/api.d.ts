import ApiFunction from '../generics/api-function'
import HelloWorld from '../types/hello-world'
import ArticleDetails from '../types/article-details'

interface Api {
  helloWorld: ApiFunction<null, HelloWorld>
  webpageToRemarkable: ApiFunction<
    { url: string; token: string },
    ArticleDetails
  >
  registerDevice: ApiFunction<string, string>
}

export default Api
