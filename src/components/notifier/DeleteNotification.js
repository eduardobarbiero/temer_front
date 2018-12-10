import React from 'react';

export const DeleteNotification = ({text, apply, reject}) => {
  return (
    <div className="row mt-3">
        <div className="col">	 
            <div className="row mt-3 text-center">
                <div className="col">	
                    <h6>{text}</h6>
                </div>    
            </div>
            <div className="row mt-3">
                <div className="col">	
                    <button 
                        type="button" 
                        className='btn btn-primary btn-md float-left'
                        onClick={(event) => apply()}
                    >
                            Excluir
                    </button>
                    <button 
                        type="button" 
                        className='btn btn-default btn-md float-right'
                        onClick={(event) => reject()}
                    >
                        Cancelar
                    </button>      
                </div>
            </div>
        </div>
    </div>    

  );
}