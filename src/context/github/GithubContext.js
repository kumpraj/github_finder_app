import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(githubReducer,initialState);

    

    

    //  get single user
    const getUser = async (login) => {

        setLoading();

        
        const response = await fetch(`${GITHUB_URL}/users/${login}`,{
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });

        if(response.status === 404){
            window.location('/notfound')
        }else {
            const data = await response.json();
        
            dispatch({
                type: 'GET_USER',
                payload: data
            })
        }

        
    }

    //  get User Repos
    const getUserRepos = async (login) => {

        setLoading();

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10,
        })
        

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`,{
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`
            }
        });

        const data = await response.json();
        
        
        dispatch({
            type: 'GET_REPOS',
            payload: data
        })
    }

    //  clear users from the state
    const clearUsers = () => dispatch({type: 'CLEAR_USERS'});

    //  Set Loading
    const setLoading = () => dispatch({type: 'SET_LOADING'});

    return (
        <GithubContext.Provider value={{
            ...state,
            dispatch,
            clearUsers,
            getUser,
            getUserRepos
        }}>
            { children }
        </GithubContext.Provider>
    )
}

export default GithubContext;