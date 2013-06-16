class AddDayToNote < ActiveRecord::Migration
  def change
    add_column :notes, :day, :date
  end
end
