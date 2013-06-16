Dailynote::Application.routes.draw do

  resources :notes
  #get ":day", controller: :notes, action: :show
  root 'home#index'

end
