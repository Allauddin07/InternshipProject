using BackendApp.Model;
using Internship.DTO;

namespace BackendApp.Infrastructure.Irepository
{
    public interface ISales
    {
       Task<IEnumerable<SalesDto>> GetAllAsync();

        Task<SalesDto> GetAsync(int? id);

        Task<bool> UpdateAsync(int? id, Sales sale);


        Task<bool> DeleteAsync(int? id);

        Task<bool> createAsync(Sales sale);
    }
}

