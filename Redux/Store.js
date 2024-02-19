import { configureStore } from '@reduxjs/toolkit'
import Reducer from  './Reducer'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const config = {
    key: 'root',
    storage: AsyncStorage
}
const persistReduce = persistReducer(config, Reducer)
const store = configureStore({
    reducer: persistReduce
})
const persister = persistStore(store)
export {store, persister}