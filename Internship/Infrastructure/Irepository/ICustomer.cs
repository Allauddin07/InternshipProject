using BackendApp.Model;

namespace BackendApp.Infrastructure.Irepository
{
    public interface ICustomer
    { 
        IEnumerable<Customer> GetAllAsync();

        Task<Customer> GetAsync(int? id);

        Task<bool> UpdateAsync(int? id, Customer customer);

        Task<bool> DeleteAsync(int? id);

        Task<bool> createAsync(Customer customer);
    }
}
