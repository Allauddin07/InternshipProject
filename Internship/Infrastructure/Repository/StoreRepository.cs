using BackendApp.DataBaseContext;
using BackendApp.Infrastructure.Irepository;
using BackendApp.Model;
using Microsoft.EntityFrameworkCore;

namespace BackendApp.Infrastructure.Repository
{
    public class StoreRepository:IStore
    {
        private readonly DbCntxt _dbCntxt;

        public StoreRepository(DbCntxt dbCntxt)
        {
            _dbCntxt = dbCntxt;
        }
        public async Task<bool> createAsync(Store store)
        {
            await _dbCntxt.stores.AddAsync(store);

            return true;


        }

        public async Task<bool> DeleteAsync(int? id)
        {
            var store = await _dbCntxt.stores.FindAsync(id);

            if (store != null)
            {
                _dbCntxt.stores.Remove(store);
                return true;
            }
            return false;
        }

        public async Task<ICollection<Store>> GetAllAsync()
        {
            var store = _dbCntxt.stores.Include(prop=>prop.Sales).ToList();

            if (store != null)
            {
                return store;
            }
            return null;
        }

        public async Task<Store> GetAsync(int? id)
        {
            var store = await _dbCntxt.stores.FindAsync(id);

            if (store != null)
            {

                return store;
            }
            return null;

        }

        public async Task<bool> UpdateAsync(int? id, Store store)
        {

            var data = await _dbCntxt.stores.FindAsync(id);

            if (data != null)
            {
                _dbCntxt.stores.Attach(data);

                data.Address = store.Address;
                data.Name = store.Name; 



                return true;
            }
            return false;

        }
    }
}
