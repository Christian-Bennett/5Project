using System;
using Domain.Models;
using System.Collections;

namespace API.Events
{
  
  public class DbEvents{
    

    public delegate void DbEventHandler(object source, DbEventArgs args);
    public class DbEventArgs : EventArgs
    {
      public IEnumerable EventDetails { get; set; }
    }

    public event DbEventHandler DbEvent;

    public virtual void OnDbEvent(string pass)
    {
      var args = new DbEventArgs(){EventDetails = pass};
      if(DbEvent != null)
      {
        DbEvent(this, args);

      }
    }

  }
}