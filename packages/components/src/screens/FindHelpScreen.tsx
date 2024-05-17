import React from 'react'
import { FindHelpLayout } from './findHelpScreen/FindHelpLayout'
import { SearchBar } from './findHelpScreen/SearchBar'
import { HelpCenterContainer } from './findHelpScreen/HelpCenterContainer'
import { useFilters } from './findHelpScreen/hooks/useFilters'
import { Header } from '../components/common/Header'

export function FindHelpScreen({ navigation }) {
  const {
    isFilterActive,
    setFilterActive,
    onGlobalFilter,
    filteredHelpCenters,
    onFilterHelpCenter,
    onFilterByAttribute,
    onFilterByLocation,
    setActiveSwipeIndex,
    hideFilters,
    activeTab,
  } = useFilters()

  return (
    <FindHelpLayout
      SearchBar={
        hideFilters ? null : (
          <SearchBar
            onFilterHelpCenter={onFilterHelpCenter}
            isFilterActive={isFilterActive}
            setFilterActive={setFilterActive}
            onGlobalFilter={onGlobalFilter}
            onFilterByAttribute={onFilterByAttribute}
            onFilterByLocation={onFilterByLocation}
          />
        )
      }
      Header={<Header screenTitle="find help" />}
      HelpCenters={
        <HelpCenterContainer
          setActiveSwipeIndex={setActiveSwipeIndex}
          isFilterActive={isFilterActive}
          filteredHelpCenters={filteredHelpCenters}
          activeTab={activeTab}
        />
      }
    />
  )
}
