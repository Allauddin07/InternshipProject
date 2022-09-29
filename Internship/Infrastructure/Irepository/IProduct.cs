using BackendApp.Model;

namespace BackendApp.Infrastructure.Irepository
{
    public interface IProduct
    {
        Task<ICollection<Product>> GetAllAsync();

        Task<Product> GetAsync(int? id);

        Task<bool> UpdateAsync(int? id, Product product);


        Task<bool> DeleteAsync(int? id);

        Task<bool> createAsync(Product product);
    }
}

