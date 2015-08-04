Ext.onReady(function() {
	
  Ext.Direct.addProvider(Ext.app.REMOTING_API, {
    id: 'messageProvider',
    type: 'polling',
    url: Ext.app.POLLING_URLS.message
  }, {
    id: 'pollWithParamsProvider',
    type: 'polling',
    interval: 9000,
    url: Ext.app.POLLING_URLS.pollWithParams,
    baseParams: {
      no: 1,
      name: 'Ralph'
    }
  });
  
  var es = new EventSource("../testsse");
  es.addEventListener('message', sseMessageHandler, false);
  
  var out = new Ext.form.DisplayField( {
    cls: 'x-form-text',
    id: 'out'
  });

  var text = new Ext.form.TextField( {
    width: 300,
    emptyText: 'Echo input'
  });

  var call = new Ext.Button( {
    text: 'Echo',
    handler: function() {
      testAction.doEcho(text.getValue(), function(result, e) {
        var t = e.getTransaction();
        out.append(String.format('<p><b>Successful call to {0}.{1} with response:</b><xmp>{2}</xmp></p>', t.action,
            t.method, Ext.encode(result)));
        out.el.scroll('b', 100000, true);
      });
    }
  });

  var num = new Ext.form.NumberField( {
    width: 80,
    emptyText: 'Multiply x 8',
    style: 'text-align:left;'
  });

  var multiply = new Ext.Button( {
    text: 'Multiply',
    handler: function() {
      testAction.multiply(num.getValue(), function(result, e) {
        var t = e.getTransaction();
        if (e.status) {
          out.append(String.format('<p><b>Successful call to {0}.{1} with response:</b><xmp>{2}</xmp></p>', t.action,
              t.method, Ext.encode(result)));
        } else {
          out.append(String.format('<p><b>Call to {0}.{1} failed with message:</b><xmp>{2}</xmp></p>', t.action,
              t.method, e.message));
        }
        out.el.scroll('down', 100000, true);
      });
    }
  });

  var connect = new Ext.Button( {
    text: 'Connect Poller',
    disabled: true,
    id: 'connectButton',
    handler: function(b) {
      var pollA = Ext.Direct.getProvider('messageProvider');
      var pollB = Ext.Direct.getProvider('pollWithParamsProvider');
      if (!pollA.isConnected()) {
        pollA.connect();
      }
      if (!pollB.isConnected()) {
        pollB.connect();
      }
      b.disable();
      
      es = new EventSource("../testsse");
      es.addEventListener('message', sseMessageHandler, false);
      
      Ext.getCmp('disconnectButton').enable();
    }
  });

  var disconnect = new Ext.Button( {
    text: 'Disconnect Poller',
    id: 'disconnectButton',
    handler: function(b) {
      var pollA = Ext.Direct.getProvider('messageProvider');
      var pollB = Ext.Direct.getProvider('pollWithParamsProvider');
      if (pollA.isConnected()) {
        pollA.disconnect();
      }
      if (pollB.isConnected()) {
        pollB.disconnect();
      }
      b.disable();
      es.close();
      Ext.getCmp('connectButton').enable();
      
    }
  });

  text.on('specialkey', function(t, e) {
    if (e.getKey() === e.ENTER) {
      call.handler();
    }
  });

  num.on('specialkey', function(t, e) {
    if (e.getKey() === e.ENTER) {
      multiply.handler();
    }
  });

  new Ext.Panel( {
    title: 'Remote Call Log',
    renderTo: Ext.getBody(),
    frame: true,
    width: 700,
    height: 300,
    layout: 'fit',
    items: [ out ],
    bbar: [ text, call, '-', num, multiply, '->', connect, disconnect ]
  });

  Ext.Direct.on( {
    message: function(e) {
      out.append(String.format('<p><i>{0}</i></p>', e.data));
      out.el.scroll('down', 100000, true);
    },
    pollWithParams: function(e) {
      out.append(String.format('<p>{0}</p>', e.data));
      out.el.scroll('down', 100000, true);
      Ext.Direct.getProvider('pollWithParamsProvider').baseParams.no++;
    }
  });
  
  function sseMessageHandler(event) {
	  out.append(String.format('<p><i>{0}</i></p>', event.data));
      out.el.scroll('down', 100000, true);
  }
    
});
