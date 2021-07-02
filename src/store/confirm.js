

export default {
    namespaced:true,
    state: {
        confirm: false,
        componentData: null,
    },
    mutations: {
        closeModal(state){
            state.confirm = false;
        },
        askDelete(state, payload){
            state.componentData = payload;
            state.confirm = true;
        },
        approveDelete(state){
            state.confirm = false;
        },
        cancelDelete(state){
            state.confirm = false;
        }
    },
    actions: {
        closeModal(context){
            context.commit('closeModal');
        },
        askDelete(context, payload){
            context.commit('askDelete', payload);
        },
        approveDelete(context){
            context.dispatch("deleteComponent", context.getters.getComponentData, { root: true });
            context.commit('approveDelete');
        },
        cancelDelete(context){
            context.commit('cancelDelete');
        }
    },
    getters: {
        getConfirm(state){
            return state.confirm;
        },
        getComponentData(state){
            return state.componentData;
        },
        getTitle(state){
            return state.componentData.title;
        }
    }
}