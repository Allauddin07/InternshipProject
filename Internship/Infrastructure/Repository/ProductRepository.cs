using BackendApp.DataBaseContext;
using BackendApp.Infrastructure.Irepository;
using BackendApp.Model;
using Microsoft.EntityFrameworkCore;

namespace BackendApp.Infrastructure.Repository
{
    public class ProductRepository:IProduct
    {
        private readonly DbCntxt _dbCntxt;

        public ProductRepository(DbCntxt dbCntxt)
        {
            _dbCntxt = dbCntxt;
        }
        public async Task<bool> createAsync(Product product)
        {
            await _dbCntxt.products.AddAsync(product);

            return true;


        }

        public async Task<bool> DeleteAsync(int? id)
        {
            var product = await _dbCntxt.products.Include(x=>x.Sales).FirstOrDefaultAsync(s=>s.ProductId==id);

            if (product != null)
            {
                _dbCntxt.products.Remove(product);
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<ICollection<Product>> GetAllAsync()
        {
            var product = await _dbCntxt.products.Include(x=>x.Sales).ToListAsync();

            if (product != null)
            {
                return product;
            }
            return null;
        }

        public async Task<Product> GetAsync(int? id)
        {
            var product = await _dbCntxt.products.FindAsync(id);

            if (product != null)
            {

                return product;
            }
            return null;

        }

        public async Task<bool> UpdateAsync(int? id, Product product)
        {

            var data = await _dbCntxt.products.FindAsync(id);

            if (data != null)
            {
                _dbCntxt.products.Attach(data);

                data.Name = product.Name;

                data.Price = product.Price;



                return true;
            }
            return false;

        }
    }
}

