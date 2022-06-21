import { Container, Text, TouchableOpacity, Box } from '@/atoms'
import HeaderBar from '@/components/header-bar'
import FeatherIcon from '@/components/icon'
import MoveNoteSheet from '@/components/move-note-sheet'
import NoteList from '@/components/note-list'
import useStickHeader from '@/hooks/use-sticky-header'
import { HomeDrawerParamList, RootStackParamList } from '@/navs'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useRef, useState } from 'react'

type Props = CompositeScreenProps<DrawerScreenProps<HomeDrawerParamList, 'Main'>, NativeStackScreenProps<RootStackParamList>>

export default function MainScreen({ navigation }: Props) {
  const refMoveNoteSheet = useRef<MoveNoteSheet>(null)
  const { handleNoteListLayout, handleScroll, headerBarHeight, headerBarStyle } = useStickHeader()
  const [concealNoteListItem, setConcealNoteListItem] = useState<(() => void) | null>(null)

  const handleSidebarToggle = useCallback(() => {
    navigation.toggleDrawer()
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hanldeNoteListItemPress = useCallback((noteId: string) => {
    navigation.navigate('Detail', { noteId })
  }, [])
  
  const handleNoteListItemSwipeLeft = useCallback((_noteId: string, conceal: () => void) => {
    const { current: menu } = refMoveNoteSheet
    if (menu) {
      menu.show()
      setConcealNoteListItem(() => conceal)
    }
  }, [])

  const handleMoveSheetClose = useCallback(() => {
    concealNoteListItem && concealNoteListItem()
    setConcealNoteListItem(null)
  }, [concealNoteListItem])

  return (
    <Container>
      <NoteList contentInsetTop={headerBarHeight} onScroll={handleScroll} onItemPress={hanldeNoteListItemPress} onItemSwipeLeft={handleNoteListItemSwipeLeft}/>
      <HeaderBar style={headerBarStyle} onLayout={handleNoteListLayout}>
        <TouchableOpacity m="xs" p="xs" rippleBorderless onPress={handleSidebarToggle}>
          <FeatherIcon name='menu' size={22}/>
        </TouchableOpacity> 
        <Box flex={1} alignItems="center">
          <Text fontWeight={"bold"}>All Notes</Text>
        </Box>
        <TouchableOpacity m="xs" p="xs" rippleBorderless>
          <FeatherIcon name='more-vertical' size={22}/>
        </TouchableOpacity>
      </HeaderBar>
      <MoveNoteSheet ref={refMoveNoteSheet} onClose={handleMoveSheetClose} />
    </Container>
  )
}