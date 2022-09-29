using BackendApp.DataBaseContext;
using BackendApp.Infrastructure.Irepository;
using BackendApp.Model;

namespace BackendApp.Infrastructure.Repository
{
    public class UnitOfWorkRepository : IUnitOfWork
    {
        private readonly DbCntxt _dbCntxt;

        public UnitOfWorkRepository(DbCntxt dbCntxt)
        {
            _dbCntxt = dbCntxt;
        }
        public ICustomer customer => new CustomerRepository(_dbCntxt);

        public IProduct product => new ProductRepository(_dbCntxt);

        public ISales sale => new SalesRepository(_dbCntxt);

        public IStore store => new StoreRepository(_dbCntxt);

        public async Task<bool> SaveChangesAsync()
        {
            return await _dbCntxt.SaveChangesAsync() > 0;  
            
        }
    }
}
