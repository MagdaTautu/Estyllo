

export const getAllServices = async (req,res,next) => {
    const db = req.app.get('db');
    const query = "SELECT * FROM personal";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ success: false, message: 'Server error' });

            return;
        }
        res.json(results);
    });
}

export const getCoaforPrices = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT serviciu, pret FROM coafor_femei WHERE TIP IS NULL";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ success: false, message: 'Server error' });

            return;
        }
        res.json(results);
    });
};

export const getCoafatPrices = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT serviciu, pret FROM coafor_femei WHERE tip ='coafat'";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ success: false, message: 'Server error' });

            return;
        }
        res.json(results);
    });
};

export const getCreponatPrices = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT serviciu, pret FROM coafor_femei WHERE TIP='creponat'";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ success: false, message: 'Server error' });

            return;
        }
        res.json(results);
    });
};

export const getAfroPrices = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT serviciu, pret FROM coafor_femei WHERE TIP='afro'";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ success: false, message: 'Server error' });

            return;
        }
        res.json(results);
    });
};

export const getOcaziePrices = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT serviciu, pret FROM coafor_femei WHERE TIP='ocazie'";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ success: false, message: 'Server error' });

            return;
        }
        res.json(results);
    });
};


export const getFrizeriePrices = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT serviciu, pret FROM frizerie";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ success: false, message: 'Server error' });

            return;
        }
        res.json(results);
    });
};

export const getManipediPrices = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT serviciu, pret FROM mani_pedi";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ success: false, message: 'Server error' });

            return;
        }
        res.json(results);
    });
};

export const getSuvitePrices = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT * FROM decolorat WHERE tip = 'suvite'";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err.message);
        res.status(500).json({ success: false, message: err.message, error: err.message });
        return;
      }
      res.json(results);
    });
  };

  export const getSuviteVopseaPrices = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT * FROM decolorat WHERE tip = 'suvite+vopsea'";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err.message);
        res.status(500).json({ success: false, message: err.message, error: err.message });
        return;
      }
      res.json(results);
    });
  };

export const getDecoloratPrices = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT * FROM decolorat WHERE tip IS NULL";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err.message);
        res.status(500).json({ success: false, message: err.message, error: err.message });
        return;
      }
      res.json(results);
    });
  };
  export const getDecoloratPachete= async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT * FROM decolorat WHERE tip ='pachet'";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err.message);
        res.status(500).json({ success: false, message: err.message, error: err.message });
        return;
      }
      res.json(results);
    });
  };

export const getVopsitPrices = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT * FROM vopsit_femei WHERE tip IS NULL";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err.message);
        res.status(500).json({ success: false, message: err.message, error: err.message });
        return;
      }
      res.json(results);
    });
  };

  export const getVopsitPacheteFara = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT * FROM vopsit_femei WHERE tip = 'pachet-fara'";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err.message);
        res.status(500).json({ success: false, message: err.message, error: err.message });
        return;
      }
      res.json(results);
    });
  };
  export const getVopsitPachete= async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT * FROM vopsit_femei WHERE tip = 'pachet'";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error executing query:", err.message);
        res.status(500).json({ success: false, message: err.message, error: err.message });
        return;
      }
      res.json(results);
    });
  };
  

export const getCosmeticaFemeiPrices = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT serviciu, pret FROM cosmetica_femei";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ success: false, message: 'Server error' });
            return;
        }
        res.json(results);
    });
};

export const getCosmeticaBarbatiPrices = async (req, res, next) => {
    const db = req.app.get('db');
    const query = "SELECT serviciu, pret FROM cosmetica_barbati";
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ success: false, message: 'Server error' });
            
            return;
        }
        res.json(results);
    });
};



export const getGeneralPrices = async (req, res, next) => {
    const db = req.app.get('db');
    const service_name = req.query.service;

    if (!service_name) {
        res.status(400).send("Service name is required");
        return;
    }

    const query = `SELECT serviciu, pret FROM ??`; // Use parameterized query to prevent SQL injection
    db.query(query, [service_name], (err, results) => {
        if (err) {
            console.error("Error executing query:", err.message);
            res.status(500).json({ success: false, message: 'Server error' });

            return;
        }
        res.json(results);
    });
};
