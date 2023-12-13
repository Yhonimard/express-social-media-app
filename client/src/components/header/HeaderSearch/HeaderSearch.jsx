import { Modal, Paper, Tab, Tabs, Box } from "@mui/material"
import HeaderSearchStyled from "./HeaderSearch.Styled"
import Icon from "@/assets/Icon"
import useDisclosure from "@/hooks/useDisclosure"
import CustomTabPanel from "@/components/CustomTabPanel"
import HeaderSearchUserList from "./HeaderSearchUser/HeaderSearchUserList"
import { useDispatch, useSelector } from "react-redux"
import global from "@/config/global"
import { useDebounce } from "use-debounce"
import { HEADER_SEARCH_DEBOUNCE_TIME } from "@/fixtures/global"
import HeaderSearchPostList from "./HeaderSearchPost/HeaderSearchPostList"

const HeaderSearch = () => {
  const [isOpenModal, { toggle: toggleModal }] = useDisclosure(false)

  const headerSearchState = useSelector(s => s.global.headerSearch)
  const dispatch = useDispatch()

  const onTabValueChange = (e, val) => {
    dispatch(global.reducer.action.setHeaderSearchTabValue({ tabsLocation: val }))
  }

  const onSearchInputChange = (val) => {
    dispatch(global.reducer.action.setHeaderSearchInputValue({ searchValue: val }))
  }

  const [searchValue] = useDebounce(headerSearchState.searchValue, HEADER_SEARCH_DEBOUNCE_TIME)

  return (
    <>
      <HeaderSearchStyled.Search onClick={toggleModal}>
        <HeaderSearchStyled.SearchIconWrapper>
          <Icon.Search />
        </HeaderSearchStyled.SearchIconWrapper>
        <HeaderSearchStyled.Input
          placeholder="search..."
        />
      </HeaderSearchStyled.Search>

      <Modal open={isOpenModal} onClose={toggleModal} sx={{ justifyContent: "center", display: "flex", px: 1 }}>
        <Paper sx={{ width: "100%", maxWidth: '30rem', p: 2, maxHeight: 500, height: "fit-content", mt: 10, overflowY: "auto" }}>
          <HeaderSearchStyled.Search sx={{ width: "100%" }}>
            <HeaderSearchStyled.SearchIconWrapper>
              <Icon.Search />
            </HeaderSearchStyled.SearchIconWrapper>
            <HeaderSearchStyled.Input
              placeholder="search..."
              onChange={(e) => onSearchInputChange(e.target.value)}
              value={headerSearchState.searchValue}
              fullWidth
            />
          </HeaderSearchStyled.Search>
          <Tabs value={headerSearchState.tabsLocation} onChange={onTabValueChange} sx={{ width: "100%" }}>
            <Tab label="Post" sx={{ width: "50%" }} />
            <Tab label="User" sx={{ width: "50%" }} />
          </Tabs>
          <Box >
            <CustomTabPanel index={0} value={headerSearchState.tabsLocation} >
              <HeaderSearchPostList
                searchValue={searchValue}
                toggleModal={toggleModal}
              />
            </CustomTabPanel>
            <CustomTabPanel index={1} value={headerSearchState.tabsLocation}>
              <HeaderSearchUserList
                searchValue={searchValue}
                toggleModal={toggleModal}
              />
            </CustomTabPanel>
          </Box>
        </Paper>
      </Modal >
    </>
  )
}

export default HeaderSearch
