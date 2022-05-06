import SearchBar from './components/search/SearchBar'
import SearchResults from './components/search/SearchResults'
import Pagination from './components/pagination/Pagination'
import Sidebar from './components/SideBar'

function App() {
    return (
        <div className="App">
            <main className='main-content'>
                <SearchBar />
                <div className='bottom-container'>
                    <div className='search-results-container'>
                        <Pagination />
                        <SearchResults />
                    </div>
                    <Sidebar />
                </div>
            </main>
        </div>
    )
}

export default App
