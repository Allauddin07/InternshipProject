namespace BackendApp.Infrastructure.Irepository
{
    public interface IUnitOfWork
    {
        ICustomer customer { get;}

        IProduct product { get; }
        ISales sale { get; }
        IStore store { get; }

        Task<bool> SaveChangesAsync();


    }
}
