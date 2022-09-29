using BackendApp.Model;

namespace BackendApp.Infrastructure.Irepository
{
    public interface IStore
    {
        Task<ICollection<Store>> GetAllAsync();

        Task<Store> GetAsync(int? id);
        Task<bool> UpdateAsync(int? id, Store store);


        Task<bool> DeleteAsync(int? id);

        Task<bool> createAsync(Store store);
    }
}

