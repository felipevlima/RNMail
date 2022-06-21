import { Note } from '@/models'
import { Theme } from '@/themes'
import { createBox } from '@shopify/restyle'
import React, { useCallback } from 'react'
import { FlatListProps, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import NOTES from '@/fixtures/notes'
import NoteListItem from './note-list-item'
import Animated, { AnimateProps } from 'react-native-reanimated'
import { Box } from '@/atoms'

const StyledFlatList = createBox<Theme, AnimateProps<FlatListProps<Note>>>(Animated.FlatList)

interface Props {
  contentInsetTop: number;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onItemPress: (nodeId: string) => void;
  onItemSwipeLeft: (noteId: string, cancel: () => void) => void;
}

const NoteList: React.FC<Props> = ({ contentInsetTop, onScroll, onItemPress, onItemSwipeLeft }: Props) => {
  const renderItem = useCallback(({item}) => {
    return <NoteListItem {...item} onPress={onItemPress} onSwipeLeft={onItemSwipeLeft}/>
  }, [onItemPress, onItemSwipeLeft]) 

  return (
    <StyledFlatList 
      contentInsetAdjustmentBehavior='automatic' 
      data={NOTES} 
      renderItem={renderItem} 
      keyExtractor={item => item.id} 
      width="100%"
      onScroll={onScroll}
      scrollEventThrottle={16}
      ListHeaderComponent={<Box width="100%" height={contentInsetTop} />}
    />
  )
}

export default NoteList