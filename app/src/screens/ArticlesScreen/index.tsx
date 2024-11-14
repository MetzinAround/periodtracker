import * as React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Screen } from '../../components/Screen'
import { ScreenComponent } from '../../navigation/RootNavigator'
import { useEncyclopedia } from '../EncyclopediaScreen/EncyclopediaContext'
import { SearchBar } from '../../components/SearchBar'
import { ArticleContent } from './ArticleContent'
import { Text } from '../../components/Text'
import { Article } from '../../core/types'
import { useSelector } from '../../redux/useSelector'
import { articlesSelector, subCategoryByIDSelector } from '../../redux/selectors'
import { globalStyles } from '../../config/theme'
import { useColor } from '../../hooks/useColor'
import { AudioPlayer } from '../../components/AudioPlayer'

const ArticlesScreen: ScreenComponent<'Articles'> = ({ navigation, route }) => {
  const { backgroundColor, palette } = useColor()
  const { query, setQuery, articleIds } = useEncyclopedia()

  const subcategoryId = route.params.subcategoryId
  const subcategory = useSelector((s) => subCategoryByIDSelector(s, subcategoryId))

  const allArticles = useSelector(articlesSelector)

  const articles = React.useMemo(() => {
    return subcategory?.articles.reduce<Article[]>((acc, articleId) => {
      if (articleIds.includes(articleId)) {
        acc.push(allArticles.byId[articleId])
      }
      return acc
    }, [])
  }, [subcategory, articleIds, allArticles])

  React.useLayoutEffect(() => {
    // Set Screen title
    if (subcategory) {
      navigation.setOptions({
        title: subcategory.name,
        // @ts-expect-error // TODO: CustomStackNavigationOptions
        disableTranslate: true,
      })
    }
  }, [navigation, subcategory])

  return (
    <Screen>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <SearchBar query={query} setQuery={setQuery} style={globalStyles.shadow} />
        {articles?.map((article, i) => {
          const audioAssetUri = audios[i] ?? undefined
          // const audioAssetUri =  `${AWS_S3_BASE_URL}/${article.voiceOverKey}` TODO:

          return (
            <View style={[styles.card, { backgroundColor }, globalStyles.shadow]} key={article.id}>
              {article.title && (
                <Text
                  style={[styles.title, { color: palette.danger.text }]}
                  enableTranslate={false}
                >
                  {article.title}
                </Text>
              )}
              <Text
                style={[styles.subCategory, { color: palette.danger.text }]}
                enableTranslate={false}
              >
                {subcategory.name}
              </Text>

              <AudioPlayer audioAssetUri={audioAssetUri} />
              <ArticleContent articleId={article.id} text={article.content} />
            </View>
          )
        })}
      </ScrollView>
    </Screen>
  )
}

export default ArticlesScreen

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    paddingHorizontal: 12,
  },
  card: {
    width: '100%',
    minHeight: 120,
    marginVertical: 4,
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  subCategory: {
    fontWeight: 'bold',
    marginBottom: 24,
  },
})

// TODO: remove

const audio0 =
  'https://firebasestorage.googleapis.com/v0/b/periodtracker-cb22c.appspot.com/o/10cbc9dd-a421-40c4-a4d4-9478845fcd91-file_example_ERROR_mp3_700kb.mp3?alt=media'

const audio1 =
  'https://firebasestorage.googleapis.com/v0/b/periodtracker-cb22c.appspot.com/o/10cbc9dd-a421-40c4-a4d4-9478845fcd91-file_example_mp3_700kb.mp3?alt=media'

const audio2 =
  'https://firebasestorage.googleapis.com/v0/b/periodtracker-cb22c.appspot.com/o/ca7e3ce1-6e04-4bc1-b986-63b9eb6bf08f-file_example_mp3_700kb.mp3?alt=media'

const audio3 =
  'https://firebasestorage.googleapis.com/v0/b/periodtracker-cb22c.appspot.com/o/d4b08b3f-b84a-44a9-a54c-2dc2c3a2b611-file_example_mp3_700kb.mp3?alt=media'

const audios = [audio0, audio1, audio2, audio3]
