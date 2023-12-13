import Icon from "@/assets/icon"
import useSearchPost from "@/features/post/useSearchPost"
import useSearchUser from "@/features/user/useSearchUser"
import globalReducer from "@/redux/globalReducer"
import { ActionIcon, Button, Modal, SimpleGrid, Tabs, TextInput, rem, useMantineTheme } from "@mantine/core"
import { Fragment } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDebounce } from "use-debounce"
import HeaderSearchPostCard from "./HeaderSearchPostCard"
import HeaderSearchUserCard from "./HeaderSearchUserCard"

const HeaderSearch = ({ opened, toggle }) => {
  const theme = useMantineTheme()
  const dispatch = useDispatch()
  const headerSearch = useSelector(s => s.global.headerSearch)


  const searchHandler = (e) => {
    dispatch(globalReducer.action.setHeaderSearchValue({ searchValue: e.target.value }))
  }

  const [searchValue] = useDebounce(headerSearch.searchValue, 700)
  const userQuery = useSearchUser(searchValue)
  const postQuery = useSearchPost(searchValue)


  return (
    <Modal opened={opened} onClose={toggle} title={`Search ${headerSearch.tabsLocation}`} size={`lg`}>
      <TextInput
        radius="xl"
        value={headerSearch.searchValue}
        size="md"
        onChange={searchHandler}
        placeholder="Search..."
        rightSectionWidth={42}
        leftSection={
          <Icon.Search
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        rightSection={
          <ActionIcon
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled">
            <Icon.Search
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        }
      />
      <Tabs value={headerSearch.tabsLocation} onChange={(e) => dispatch(globalReducer.action.setHeaderSearchTabsLocation({ tabsLocation: e }))} mt={20}>
        <Tabs.List grow justify="center">
          <Tabs.Tab value="Post">Post</Tabs.Tab>
          <Tabs.Tab value="People">People</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="Post" >
          <SimpleGrid cols={1} mt={15}>
            {postQuery.data?.pages.map((p, i) => (
              <Fragment key={i}>
                {p.data.map(p => (
                  <HeaderSearchPostCard key={p.id} title={p.title} content={p.content} pid={p.id} toggle={toggle} />
                ))}
              </Fragment>
            ))}
            {postQuery.hasNextPage && (
              <Button onClick={postQuery.fetchNextPage} >See More</Button>
            )}
          </SimpleGrid>
        </Tabs.Panel>
        <Tabs.Panel value="People">
          <SimpleGrid cols={1} mt={15}>
            {userQuery.data?.pages.map((p, i) => (
              <Fragment key={i}>
                {p.data.map(u => (
                  <HeaderSearchUserCard key={u.id} user={u} toggle={toggle} />
                ))}
              </Fragment>
            ))}
            {userQuery.hasNextPage && <Button onClick={userQuery.fetchNextPage}>See More</Button>}
          </SimpleGrid>

        </Tabs.Panel>
      </Tabs>
    </Modal>
  )
}

export default HeaderSearch
