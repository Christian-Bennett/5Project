using System;
using Domain.Models;
using System.Collections;

namespace API.Events
{
  public class DbEventArgs : EventArgs
  {
    public IEnumerable EventDetails { get; set; }
  }

  public delegate void DbEventHandler(object source, DbEventArgs args);
  
  public class DbEvents
  {
    public event DbEventHandler DbEvent;

    public virtual void OnDbEvent(string pass)
    {
      if(DbEvent != null)
      {
        DbEvent(this, new DbEventArgs(){EventDetails = pass});

      }
    }

  }
}