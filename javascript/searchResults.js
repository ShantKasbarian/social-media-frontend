let searchResultsPageNo = 0;
let searchResultsTotalPages;
let input;
let searchResults;

async function getSearchResults() {
    debugger
    input = await localStorage.getItem('item-to-search');

    if(input === null || input === undefined) {
        alert('Error: the name of the resource you are searching for cannot be empty');
        return;
    }

    const response = await fetch(`http://localhost:8000/user/${input}/search?page=${searchResultsPageNo}&size=5`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
    });

    try {
        if(!response.ok) {
            let text = JSON.parse(await response.text()).message;
            throw new Error(text);
        }
        
        const data = await response.json();
        searchResultsTotalPages = data.totalPages;

        searchResults = await data.content;
        let searchResultsContainer = document.getElementById('results');

        if(searchResults.length === 0) {
            let message = document.createElement('p');
            message.innerHTML = 'no results were found';

            searchResultsContainer.appendChild(message);
            return;
        }

        let html = '';

        searchResults.forEach(element => {
            html += 
            `<button onclick="getUserPostsById('${element.id}')" type="reset" style="border: transparent; background: #fff;">
                <div class="card" style="width: 18rem;">
                    <div class="card-body" style="display: flex; flex-direction: column">
                        <p>username: ${element.username}</p>
                        <P>name: ${element.name}</p>
                        <p>lastname: ${element.lastname}</p>
                    </div>
                </div>
            </button>`;
        });

        searchResultsContainer.innerHTML = html;

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

window.addEventListener('close', () => {
    localStorage.removeItem('item-to-search')
});

window.addEventListener('scroll', () => {
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight &&
        searchResultsPageNo++ <= searchResultsTotalPages && 
        (searchResults !== null || searchResults !== undefined) &&
        searchResults.length === 5
    ) {
        getSearchResults();
    }

    return;
});

getSearchResults();