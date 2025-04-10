async function getSearchResults() {
    const input = await localStorage.getItem('item-to-search');

    if(input === null || input === undefined) {
        alert('Error: the name of the resource you are searchin for cannot be empty');
        return;
    }

    const response = await fetch(`http://loclhost:8000/user/${input}/search`, {
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

        let searchResults = await data.content;
        let searchResultsContainer = document.getElementById('results');

        if(searchResults.length === 0) {
            let message = document.createElement('p');
            message.innerHTML = 'no results were found';

            searchResultsContainer.appendChild(message);
            return;
        }

        data.forEach(element => {
            let result = document.createElement('a');
            result.innerHTML = element.username;

            searchResultsContainer.appendChild(result);
        });

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

window.onclose(localStorage.removeItem('item-to-search'));

getSearchResults();